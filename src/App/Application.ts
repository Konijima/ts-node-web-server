import HTTP from 'http'
import Express from 'express'
import IO from 'socket.io'
import Database from '@Database/Database'
import { AppLogger } from '@App/Logger'

// Middlewares
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')

// Routers
import AuthRouter from '@App/Routers/AuthRouter'
import FileTransferRouter from '@App/Routers/FileTransferRouter'
import StaticRouter from '@App/Routers/StaticRouter'
import WebRouter from '@App/Routers/WebRouter'

// Sockets
import { SocketSession } from './SocketSession'

class Application {

    public get ExpressApp() { return this.expressApp }
    private expressApp: Express.Application

    public get HttpServer() { return this.socketServer }
    private httpServer: HTTP.Server

    public get SocketServer() { return this.socketServer }
    private socketServer: IO.Server

    constructor() {
        this.expressApp = Express()
        this.httpServer = HTTP.createServer(this.expressApp)
        this.socketServer = new IO.Server(this.httpServer)

        // Add Middlewares
        this.expressApp.use(cors())
        this.expressApp.use(bodyParser())
        this.expressApp.use(compression())

        // Add Routers
        this.expressApp.use(AuthRouter)
        this.expressApp.use(FileTransferRouter)
        this.expressApp.use(StaticRouter)
        this.expressApp.use(WebRouter)

        // Create socket session on connection
        this.socketServer.on('connection', (socket) => new SocketSession(socket))

        // Connect to MongoDB then start the web server
        Database.Connect().then(() => 
            this.httpServer.listen(Number(process.env.PORT), process.env.HOST, () => {
                AppLogger.log(`Application running at http://${process.env.HOST}:${process.env.PORT}`)
            })
        )

        // Handle process exit
        process.on('SIGINT', async () => await this.handleProcessExit())
    }

    private async handleProcessExit() {
        console.log('Application is closing...')
    }

}

export default new Application()
