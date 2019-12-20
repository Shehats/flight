import * as dotenv from 'dotenv'
// @ts-ignore
import path from 'path'
import { startApp } from './app'

dotenv.config()

// @ts-ignore
const port = process.env.SERVER_PORT || "9000"

startApp(port)