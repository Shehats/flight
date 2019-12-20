import { Strategy, ExtractJwt } from 'passport-jwt'
import * as Auth0Strategy from 'passport-auth0'
import * as passport from 'passport'
import { Token } from '../models'
import { getContextDataService, DataService } from './data-serv'

export class Auth0StrategyConfig {
  private strategy: Auth0Strategy.Strategy

  constructor(domain: string, clientID: string, clientSecret: string, callbackURL: string) {
    let StrategyOpts: Auth0Strategy.StrategyOption = {
      clientID: clientID,
      domain: domain,
      clientSecret: clientSecret,
      callbackURL: callbackURL
    }

    this.strategy = new Auth0Strategy.Strategy(StrategyOpts, (accessToken: string, refreshToken: string, _1, profile: Auth0Strategy.Profile, done: (error: any, user?: any, info?: any) => void) => {
      let dataService: DataService = getContextDataService()
      dataService.save(new Token(accessToken, refreshToken)).then(() => {
        done(null, profile)
      }).catch(err => {
        done(err)
      })
    })
    passport.use(this.strategy)
  }
}