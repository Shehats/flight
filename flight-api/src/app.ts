import * as express from 'express'

export const startApp = (port: string) => {
  const app = express()
  console.log(port)
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
  })
}
