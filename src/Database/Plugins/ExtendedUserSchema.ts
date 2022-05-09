import { Schema } from 'mongoose'
import { ExtendedDocument } from '@Database/Plugins/ExtendedSchema'

/**
 * A mongoose plugin plugged directly into the UserSchema.
 * It extends the global plugin and adds functionallity specific to a user.
 */
function ExtendedUserSchemaPlugin(schema: Schema, options: any) {

    schema.virtual('wasPasswordChanged')
        .get(function() { return this._wasPasswordChanged })
        .set(function(value: boolean) { this._wasPasswordChanged = value })

    schema.pre('save', function(next) {
        this.wasPasswordChanged = this.isModified('password')
        next()
    })

    schema.post('save', function(doc: ExtendedUserDocument) {
        if (doc.wasPasswordChanged) schema.emit('OnPasswordChange', doc)
    })

}

interface ExtendedUserDocument extends ExtendedDocument {

    /**
     * Check if the user password was changed in post save hook
     */
    wasPasswordChanged: boolean

}

export { ExtendedUserSchemaPlugin, ExtendedUserDocument }
