import { resolve } from 'path'
import express, { Router, Request, Response } from 'express'

const WebRouter = Router()

// Serve the angular web resources such as script, images and others.
WebRouter.use('/', express.static(resolve(__dirname, '../../web/dist/')))

// Any unhandled request redirect to index.html
WebRouter.get('/*', function (request: Request, response: Response) {
    response.sendFile(resolve(__dirname, '../../web/dist/index.html'))
})

export default WebRouter
