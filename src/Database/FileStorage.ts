import { Connection } from 'mongoose'
import { GridFSBucket } from 'mongodb'

class FileStorage {

    /**
     * Upload/Download audio files to your MongoDB
     */
    public get AudioStorage() { return this.audioStorage }
    private audioStorage: GridFSBucket

    /**
     * Upload/Download audio files to your MongoDB
     */
    public get ImageStorage() { return this.imageStorage }
    private imageStorage: GridFSBucket

    /**
     * Upload/Download video files to your MongoDB
     */
    public get VideoStorage() { return this.videoStorage }
    private videoStorage: GridFSBucket

    /**
     * Connect the filestorage to the MongoDB current connection
     * @param connection 
     */
    public Connect(connection: Connection) {
        this.audioStorage = new GridFSBucket(connection.db, { bucketName: 'AudioStorage' })
        this.imageStorage = new GridFSBucket(connection.db, { bucketName: 'ImageStorage' })
        this.videoStorage = new GridFSBucket(connection.db, { bucketName: 'VideoStorage' })
    }

}

export default new FileStorage()
