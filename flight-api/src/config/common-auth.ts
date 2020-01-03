import { User, LoginUser } from 'src/models'
import { is } from 'easy-injectionjs'
import { ClientConstants, HttpClient, DataService, getContextDataService } from 'src/services'

export const processData = (user: User, dataService: DataService = getContextDataService(), 
                            done: any, config?:any,
                            httpClient: HttpClient = is(ClientConstants.HTTP_CLIENT), 
                            userServUrl: string = is(ClientConstants.USER_SERVER),
                            saveUserUrl: string = is(ClientConstants.SAVE_USER_URL)) => {
  
  let loginUser = <LoginUser>{
    username: user.username,
    password: user.password,
    email: user.email
  }
  dataService.save(loginUser).then(u => {
    httpClient.post(`${userServUrl}/${saveUserUrl}`, user, config).then(body => 
      done(null, HttpClient.getBody<User>(body))
    ).catch(err => done(err, null))
  })
}

export const commonOAuth = (profile: import('passport-facebook').Profile|import('passport-google-oauth20').Profile, done: import('passport-facebook').VerifyFunction|import('passport-google-oauth20').VerifyCallback, dataService: DataService = getContextDataService()) => {
  let user = <User>{
    username: profile.username,
    email: profile.emails[0].value,
    password: null,
    firstName: profile.name.givenName, 
    lastName: (profile.name.middleName)?`${profile.name.middleName} ${profile.name.familyName}`: profile.name.familyName, 
  }
  processData(user, dataService, done)
}
