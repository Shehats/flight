import * as passport from 'passport'
import { getContextDataService, DataService } from '../services'
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'
import uuid = require('uuid/v4')
import { Token } from 'src/models'
import { EasySingleton } from 'easy-injectionjs'
import { AuthConfig } from '.'

@EasySingleton()
export class JWTStrategyConfig implements AuthConfig{
  private strategy: Strategy
  private secretOrKeyProvider: string

  constructor(issuer: string, audience: string, algorithms?: string[]) {
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
      let dataService: DataService = getContextDataService()
      return dataService.find(payload.userId).then(val => done(null, val)).catch(err => done(new Error("User doesn't exist")))
    })

    this.secretOrKeyProvider = secret
    passport.use(this.strategy)
  }
  
  public get SecretOrKeyProvider() : string {
    return this.secretOrKeyProvider
  }
}