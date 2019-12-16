import * as dotenv from 'dotenv'
import * as express from 'express'
// @ts-ignore
import path from 'path'

dotenv.config()

// @ts-ignore
const port = "9000"
const app = express()
console.log(port)
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
})