import mongoose from 'mongoose'
import { AppLogger } from '@App/Logger'
import { ExtendedSchemaPlugin } from '@Database/Plugins/ExtendedSchema'
import FileStorage from '@Database/FileStorage'
import { User, UserRoles } from '@Models/User'

const DEFAULT_ADMIN = {
    username: 'admin',
    email: `admin@${process.env.DOMAIN}`,
    password: 'changeme',
    role: UserRoles.ADMIN
}

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
                .then(async () => {
                    FileStorage.Connect(mongoose.connection)
                    AppLogger.log(`Database connection established!`)
                    await this.createDefaultAdminAccount()
                    resolve()
                })
                .catch((error) => {
                    AppLogger.error(error)
                    reject(error)
                })
        })
    }

    private async createDefaultAdminAccount() {
        let admin = await User.findOne({ role: UserRoles.ADMIN })
        if (!admin) {
            try {
                const admin = new User(DEFAULT_ADMIN)
                await admin.save()
                AppLogger.info('Admin account created: ', DEFAULT_ADMIN)
            }
            catch(error) {
                AppLogger.error(error)
            }
        }
        else AppLogger.info('Admin account already exist, skipping...')
    }

}

export default new Database()
