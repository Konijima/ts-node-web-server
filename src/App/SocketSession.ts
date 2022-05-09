import { Socket } from "socket.io"
import { AppLogger } from "./Logger"

class SocketSession {

    /**
     * Access any socket session instance from this static getter
     */
    public static get SocketSessions() { return this.socketSessions }
    private static socketSessions: {[socketId: string]: SocketSession} = {}

    private socket: Socket

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
    private async handleConnection() {
        
    }

    // Handle when the connection is closed
    private async handleDisconnect() {
        
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
