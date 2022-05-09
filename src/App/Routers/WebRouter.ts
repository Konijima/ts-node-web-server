import { resolve } from 'path'
import express, { Router, Request, Response } from 'express'

const WebRouter = Router()

const webPath = '../../../web/dist/'

// Serve the angular web resources such as script, images and others.
WebRouter.use('/', express.static(resolve(__dirname, webPath)))

// Any unhandled request redirect to index.html
WebRouter.get('/*', function (request: Request, response: Response) {
    response.sendFile(resolve(__dirname, webPath, 'index.html'))
})

export default WebRouter
