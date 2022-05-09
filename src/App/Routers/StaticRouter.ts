import { resolve } from 'path'
import express, { Router } from 'express'

const StaticRouter = Router()

// Serve static files such as Images & Videos from a static URL.
StaticRouter.use('/static', express.static(resolve(__dirname, '../../static')))

export default StaticRouter
