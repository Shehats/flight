import * as passport from 'passport'
import { getContextDataService, DataService } from '../services'
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'
import uuid = require('uuid/v4')
import { Token } from 'src/models'
import { EasySingleton } from 'easy-injectionjs'
import { AuthConfig } from '.'
import { NextFunction } from 'express'
import { Params, ParamsDictionary, RequestHandler, Response, Request } from 'express-serve-static-core'

@EasySingleton()
export class JWTStrategyConfig implements AuthConfig{
  private secretOrKeyProvider: string

  constructor(private strategy: Strategy, private dataService: DataService, issuer: string, audience: string, algorithms?: string[]) {
    let secret = uuid().toString()
    let StrategyOpts: StrategyOptions = {
      secretOrKeyProvider: secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: issuer,
      audience: audience,
      algorithms: algorithms || ['RS256'],
      ignoreExpiration: false,
      passReqToCallback: true
    }

    this.strategy = new Strategy(StrategyOpts, (payload: Token, done: VerifiedCallback) => {
      if (Date.now() > payload.expires) {
        return done(new Error('Token has already expired'))
      }
      return dataService.find(payload.userId).then(val => done(null, val)).catch(err => done(new Error("User doesn't exist")))
    })

    this.secretOrKeyProvider = secret
    passport.use(this.strategy)
  }
  
  public get SecretOrKeyProvider() : string {
    return this.secretOrKeyProvider
  }

  LoginFunc<P extends Params = ParamsDictionary, ResBody = any, ReqBody = any>(): RequestHandler<P, ResBody, ReqBody>[] {
    return [(req: Request<P, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction) => {
        let b = req.body
        // let user = new LoginUser
        // dataService.save(user).then(id => {
        //   let token = <Token> {
        //     userId: id,
        //     username: user.Username,
        //     email: user.Email,
        //     expires: Date.now() + 604800000
        //   }
        //   let jwtToken = jsonwebtoken.sign(token, this.jwtConfig.SecretOrKeyProvider)
        //   jsonwebtoken.decode
        //   res.status(201).json(jwtToken)
        // }).catch(err => {
        //   res.status(401)
        // })
        return null;
      }]
  }
  RegisterFunc<P extends Params = ParamsDictionary, ResBody = any, ReqBody = any>(): RequestHandler<P, ResBody, ReqBody>[] {
    throw new Error("Method not implemented.")
  }
  LogoutFunc<P extends Params = ParamsDictionary, ResBody = any, ReqBody = any>(): import("express-serve-static-core").RequestHandler<P, ResBody, ReqBody>[] {
    throw new Error("Method not implemented.")
  }
}