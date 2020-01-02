import * as express from 'express'
import * as passport from 'passport'

export const startApp = (port: string) => {
  const app: express.Express = express()
  app.use(passport.initialize())
  
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
  })
}
