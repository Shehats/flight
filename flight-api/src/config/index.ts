export { JWTStrategyConfig } from './jwt-config'
export { FaceBookConfig } from './facebook-config'
export { GoogleConfig } from './google-config'
export { TwitterConfig } from './twitter-config'
import { ParamsDictionary, Params, RequestHandler} from 'express-serve-static-core'
import { User, LoginUser } from 'src/models/user'
import { is } from 'easy-injectionjs'
import { ClientConstants, HttpClient, DataService, getContextDataService } from 'src/services'
    
export interface AuthConfig{
  LoginFunc<P extends Params = ParamsDictionary, ResBody = any, ReqBody = any>(): Array<RequestHandler<P, ResBody, ReqBody>>;

  RegisterFunc<P extends Params = ParamsDictionary, ResBody = any, ReqBody = any>(): Array<RequestHandler<P, ResBody, ReqBody>>;

  LogoutFunc<P extends Params = ParamsDictionary, ResBody = any, ReqBody = any>(): Array<RequestHandler<P, ResBody, ReqBody>>;
}

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
