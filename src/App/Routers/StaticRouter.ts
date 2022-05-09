import { resolve } from 'path'
import express, { Router } from 'express'

const StaticRouter = Router()

const staticPath = '../../../static/'

// Serve static files such as Images & Videos from a static URL.
StaticRouter.use('/static', express.static(resolve(__dirname, staticPath)))

export default StaticRouter
