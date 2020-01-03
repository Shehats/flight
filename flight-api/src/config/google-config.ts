import { commonOAuth } from ".";
import * as GoogleStrategy from 'passport-google-oauth20'

export const googleAuthentication = (clientID: string, clientSeceret: string, callbackURL: string) => {
  return new GoogleStrategy.Strategy({
    clientID: clientID,
    clientSecret: clientSeceret,
    callbackURL: callbackURL
  }, (_1: string, _2: string, profile: GoogleStrategy.Profile, done: GoogleStrategy.VerifyCallback) => {
    commonOAuth(profile, done)
  })
}
