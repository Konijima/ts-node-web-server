import mongoose from 'mongoose'
import { ExtendedSchemaPlugin } from '@Database/Plugins/ExtendedSchema'
import FileStorage from '@Database/FileStorage'
import { AppLogger } from '@App/Logger'

class Database {

    // Add your global mongoose plugins here in the constructor
    constructor() {
        mongoose.plugin(ExtendedSchemaPlugin)
    }

    /**
     * Connect to MongoDB
     * @returns Promise<void>
     */
    public async Connect() {
        return new Promise<void>((resolve, reject) => {
            mongoose.connect(process.env.DATABASE)
                .then(() => {
                    FileStorage.Connect(mongoose.connection)
                    AppLogger.log(`Database connection established!`)
                    resolve()
                })
                .catch((error) => {
                    AppLogger.error(error)
                    reject(error)
                })
        })
    }

}

export default new Database()
