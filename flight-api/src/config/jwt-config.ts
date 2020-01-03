import { getContextDataService, DataService, JWTAuthConstants } from '../services'
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'
import { Token } from 'src/models'
import { is } from 'easy-injectionjs'

export const jwtAuthentication = (issuer: string, audience: string, secret: string, algorithms?: string[], 
  dataService: DataService = getContextDataService()): Strategy => {
  let StrategyOpts: StrategyOptions = {
    secretOrKeyProvider: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: issuer,
    audience: audience,
    algorithms: algorithms || ['RS256'],
    ignoreExpiration: false,
    passReqToCallback: true
  }

  return new Strategy(StrategyOpts, (payload: Token, done: VerifiedCallback) => {
    if (Date.now() > payload.expires) {
      return done(new Error('Token has already expired'))
    }
    return dataService.find(payload.userId).then(val => done(null, val)).catch(err => done(new Error("User doesn't exist")))
  })
}
