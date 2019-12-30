import { Route } from ".";
import { Application, Request, Response, NextFunction } from "express";
import { DataService, getContextDataService } from "src/services";
import * as passport from 'passport'
import { LoginUser, User } from "src/models/user";
import * as jsonwebtoken from 'jsonwebtoken'
import { JWTStrategyConfig } from "src/config";
import { Easy } from "easy-injectionjs";
import { Token } from "src/models";

export class AuthenticationRoutes extends Route {
  @Easy()
  private jwtConfig: JWTStrategyConfig

  public createRoutes() {
    let dataService: DataService = getContextDataService()

    this.app.post('/login', (req: Request, res: Response) => {
      let b = req.body
      let user = new LoginUser
    })

    this.app.post('/register', (req: Request, res: Response) => {
      passport.authenticate('jwt', (err, payload) => {
        let b = req.body
        let user = new User(new LoginUser(b['username'], b['password'], b['email']), b['firstName'], b['lastName'], b['age'])
        dataService.save(user).then(id => {
          let token = new Token(id, user.LoginUser.Username, user.LoginUser.Email, Date.now() + 604800000)
          let jwtToken = jsonwebtoken.sign(token, this.jwtConfig.SecretOrKeyProvider)
          res.status(201).json(jwtToken)
        }).catch(err => {
          res.status(401)
        })
      })
    })

    this.app.post('/login', (req: Request, res: Response, next: NextFunction) => {

    })
  }

}