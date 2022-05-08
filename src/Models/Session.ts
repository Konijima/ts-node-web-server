import { Schema, Model, model, Types } from 'mongoose'
import { ExtendedDocument } from '@Database/Plugins/ExtendedSchema'

// Properties Interface
interface ISession {
    token: string
    userId: Types.ObjectId
    createdDate: Date
}

// Methods Interface
interface ISessionDocument extends ISession, ExtendedDocument {

}

// Statics Interface
interface ISessionModel extends Model<ISessionDocument> {

}

// Schema Definition
const SessionSchema: Schema<ISessionDocument> = new Schema({

})

// HOOKS

// EVENTS

// METHODS

// STATICS

// Schema Object
const Session = model<ISessionDocument, ISessionModel>('Session', SessionSchema)

export { Session, ISessionDocument }
