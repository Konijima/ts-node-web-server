import { Schema, Model, model, Types } from 'mongoose'
import { sign, verify } from 'jsonwebtoken'
import { ExtendedDocument } from '@Database/Plugins/ExtendedSchema'
import { IUserDocument } from '@Models/User'

// Properties Interface
interface ISession {
    token: string
    user: Types.ObjectId | IUserDocument
    createdDate: Date
    updatedDate: Date
}

// Methods Interface
interface ISessionDocument extends ISession, ExtendedDocument {

    /**
     * Update the session to prevent expiration
     */
    updateExpiration: () => Promise<void>

    /**
     * Validate the token validity and session expiration
     * Automatically delete the session if invalidated
     * @throws `session_expired` if expired
     * @throws `invalid_token` if token is invalid
     */
    checkValidity: () => Promise<void>

}

// Statics Interface
interface ISessionModel extends Model<ISessionDocument> {

}

// Schema Definition
const SessionSchema: Schema<ISessionDocument> = new Schema({

    token: {
        type: String,
        unique: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'session_require_user'],
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    updatedDate: {
        type: Date,
        default: Date.now,
    },

})

// HOOKS

SessionSchema.pre('save', function(next) {

    if (this.isNew) {

        this.token = sign({
            userId: this.user._id,
            created: this.createdDate,
        }, process.env.JWT_KEY)

    }

    else if (this.isModified('token')) {
        next(new NativeError('cannot_edit_token'))
    }
    
    next()
})

// EVENTS

// METHODS

SessionSchema.method('updateExpiration', async function (this: ISessionDocument) {
    this.updatedDate = new Date()
    await this.save()
})

SessionSchema.method('checkValidity', async function (this: ISessionDocument) {
    const expiration = Number(this.updatedDate) + (Number(process.env.SESSION_EXPIRATION) * 1000)

    if (Date.now() > expiration) {
        await this.delete()
        throw new Error('session_expired')
    }

    if (!verify(this.token, process.env.SESSION_EXPIRATION)) {
        await this.delete()
        throw new Error('invalid_token')
    }
})

// STATICS

// Schema Object
const Session = model<ISessionDocument, ISessionModel>('Session', SessionSchema)

export { Session, ISessionDocument }
