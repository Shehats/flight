import { commonOAuth } from ".";
import * as FaceBookStrategy from 'passport-facebook'

export const facebookAuthentication = (clientID: string, clientSecret: string, callbackURL: string, profileFields: string[]): FaceBookStrategy.Strategy => {
  return new FaceBookStrategy.Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL,
    profileFields: profileFields,
    enableProof: true
  }, (_1: string, _2: string, profile: FaceBookStrategy.Profile, done: FaceBookStrategy.VerifyFunction) => {
    commonOAuth(profile, done)
  })
}
