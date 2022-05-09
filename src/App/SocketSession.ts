import { Types } from "mongoose"
import { Socket } from "socket.io"
import { AppLogger } from "@App/Logger"

class SocketSession {

    protected static socketSessions: {[socketId: string]: SocketSession} = {}

    /**
     * Get a SocketSession by socket id
     * @returns SocketSession
     */
    public static getSocketSessionById(socketId: string) {
        return this.socketSessions[socketId]
    }

    /**
     * Get all active socket sessions from a user id
     * @returns SocketSession[]
     */
    public static getSocketSessionsFromUserId(userId: Types.ObjectId) {
        return Object.values(this.socketSessions).filter(s => s.userId === userId)
    }

    /**
     * Get all active socket sessions from a session id
     * @returns SocketSession[]
     */
    public static getSocketSessionsFromSessionId(sessionId: Types.ObjectId) {
        return Object.values(this.socketSessions).filter(s => s.sessionId === sessionId)
    }

    /**
     * Get the User ID, if this socket is authenticated
     */
    public get UserId() { return this.userId }
    protected userId: Types.ObjectId

    /**
     * Get the Session ID, if this socket is authenticated
     */
    public get SessionId() { return this.sessionId }
    protected sessionId: Types.ObjectId

    protected socket: Socket

    constructor(socket: Socket) {
        SocketSession.socketSessions[this.socket.id] = this
        this.socket = socket

        AppLogger.log(`${this.socket.id} has connected!`)
        this.handleConnection()

        this.socket.once('disconnect', async () => {
            delete SocketSession.socketSessions[this.socket.id]
            await this.handleDisconnect()
            AppLogger.log(`${this.socket.id} has disconnected!`)
        })
    }

    // Handle when the connection is opened
    protected async handleConnection() {
        
    }

    // Handle when the connection is closed
    protected async handleDisconnect() {
        
    }

    /**
     * Force disconnect this socket
     * @param reason optionally, give a reason to the client
     */
    public ForceDisconnect(reason?: string) {
        this.socket.emit('force_disconnect', reason)
        this.socket.disconnect(true)
    }

}

export { SocketSession }
