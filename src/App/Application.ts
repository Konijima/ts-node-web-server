import HTTP from 'http'
import Express from 'express'
import IO from 'socket.io'
import Database from '@Database/Database'
import { AppLogger } from '@App/Logger'

// Routers
import StaticRouter from '@Routers/StaticRouter'
import WebRouter from '@Routers/WebRouter'

// Middlewares
const cors = require('cors')
const compression = require('compression')

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
        this.expressApp.use(compression())

        // Add Routers
        this.expressApp.use(StaticRouter)
        this.expressApp.use(WebRouter)

        // Connect to MongoDB then start the web server
        Database.Connect().then(() => 
            this.httpServer.listen(Number(process.env.PORT), process.env.HOST, () => {
                AppLogger.log(`Application running at http://${process.env.HOST}:${process.env.PORT}`)
            })
        )
    }

}

export default new Application()