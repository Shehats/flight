import * as Auth0Strategy from 'passport-auth0'
import * as passport from 'passport'
import { getContextDataService, DataService } from '../services'
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'
import uuid = require('uuid/v4')
import { Token } from 'src/models'

export class JWTStrategyConfig {
  private strategy: Strategy

  constructor(issuer: string, audience: string, clientSecret: string, callbackURL: string, algorithms?: string[]) {
    let StrategyOpts: StrategyOptions = {
      secretOrKeyProvider: uuid().toString(),
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
    passport.use(this.strategy)
  }
}