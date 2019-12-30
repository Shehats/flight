import { JWTStrategyConfig, FaceBookConfig, GoogleConfig, AuthConfig, TwitterConfig } from '../config'
import { AuthTypes, GoogleAuthConstants, FacebookAuthConstants, JWTAuthConstants } from './constants'
import { is } from 'easy-injectionjs'
import { Request, Response, NextFunction } from 'express'
import * as passport from 'passport'
import { DataService, getContextDataService } from './data-serv'
import * as jsonwebtoken from 'jsonwebtoken'
import { LoginUser } from 'src/models/user'
import { Token } from 'src/models'


export const GetAuth = (authType: AuthTypes): AuthConfig => {
  // Lazily create authentication dependencies
  switch(authType) {
    case AuthTypes.GOOGLE_AUTH:
      return new GoogleConfig(is(GoogleAuthConstants.GOOGLE_CLIENT_ID), 
                              is(GoogleAuthConstants.GOOGLE_CLIENT_SECRET), 
                              is(GoogleAuthConstants.GOOGLE_CALL_BACK_URL))
    case AuthTypes.FACEBOOK_AUTH:
      return new FaceBookConfig(is(FacebookAuthConstants.FACEBOOK_CLIENT_ID),
                                is(FacebookAuthConstants.FACEBOOK_CLIENT_SECRET),
                                is(FacebookAuthConstants.FACEBOOK_CALL_BACK_URL),
                                is(FacebookAuthConstants.FACEBOOK_PROFILE_OPTIONS))
  }
  return new JWTStrategyConfig(is(JWTAuthConstants.JWT_ISSUER), is(JWTAuthConstants.JWT_AUDIENCE), is(JWTAuthConstants.JWT_ALGORITHMS))
}

export type AuthenticationFunc = (req: Request, res: Response, next?: NextFunction) => any

export const getRegisteratation = (authConfig: AuthConfig): AuthenticationFunc => {
  let dataService: DataService = getContextDataService()
  let configType: string = typeof authConfig
  switch(configType) {
    case GoogleConfig.name:
      return (req: Request, res: Response, next?: NextFunction) => {
        passport.authenticate('google', {scope: ['email', 'profile']})(req, res)
        if (next) {
          next()
        }
      }
      case FaceBookConfig.name:
        return (req: Request, res: Response, next?: NextFunction) => {
          
        }
      case TwitterConfig.name:
        return (req: Request, res: Response, next?: NextFunction) => {

        }
  }
  return (req: Request, res: Response, next?: NextFunction) => {
    let user = <LoginUser> req.body
    dataService.save(user).then(id => {
      let token = <Token>{
        userId: id,
        username: user.Username,
        email: user.Email,
        expires: Date.now() + 604800000
      }
      let jwtToken = jsonwebtoken.sign(token, this.jwtConfig.SecretOrKeyProvider)
      res.status(201).json(jwtToken)
    }).catch(err => {
      res.status(401)
    })
  }
}