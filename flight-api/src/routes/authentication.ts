import { Request, Response } from "express";
import { Express } from 'express'
import { jwtAuthentication, facebookAuthentication, googleAuthentication } from "src/config";
import * as uuidv4 from 'uuid/v4'
import * as passport from 'passport'


export const createAuthRoutes = (app: Express) => {
  let jwtSecret: string = uuidv4()
  let jwtStrategy: import('passport-jwt').Strategy = jwtAuthentication('accounts.plannig.com', 'planning.com', jwtSecret)
  let facebookStrategy: import('passport-facebook').Strategy = facebookAuthentication('','','',[])
  let googleStrategy: import('passport-google-oauth20').Strategy = googleAuthentication('', '','')

  passport.initialize()
  passport.use(jwtStrategy)
  passport.use(facebookStrategy)
  passport.use(googleStrategy)
  
  app.post('/login', passport.authenticate('jwt', {session: false}, (req: Request, res: Response) => {

  }))
  
  app.post('/register', (req: Request, res: Response) => {

  })

  app.post('/facebook', passport.authenticate('facebook', (req: Request, res: Response) => {

  }))

  app.post('/google', passport.authenticate('google', (req: Request, res: Response) => {

  }))
}
