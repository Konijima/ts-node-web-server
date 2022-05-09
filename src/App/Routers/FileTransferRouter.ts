import { resolve } from 'path'
import express, { Router, Request, Response } from 'express'

const FileTransferRouter = Router()

const fileTypes = ['image', 'video', 'audio']

// Download File Route
FileTransferRouter.get('/download/:type/:fileId', function (request: Request, response: Response) {
    const type = request.params.type
    const fileId = request.params.fileId
    
})

// Upload File Route
FileTransferRouter.post('/upload/:type', function (request: Request, response: Response) {
    const type = request.params.type
    
})

export default FileTransferRouter
