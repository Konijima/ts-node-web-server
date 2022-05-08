import { Schema, Model, model } from 'mongoose'
import { ExtendedDocument } from '@Database/Plugins/ExtendedSchema'

// Properties Interface
interface IUser {
    username: string
    email: string
    password: string
}

// Methods Interface
interface IUserDocument extends IUser, ExtendedDocument {

}

// Statics Interface
interface IUserModel extends Model<IUserDocument> {

}

// Schema Definition
const UserSchema: Schema<IUserDocument> = new Schema({

})

// HOOKS

// EVENTS

// METHODS

// STATICS

// Schema Object
const User = model<IUserDocument, IUserModel>('User', UserSchema)

export { User, IUserDocument }
