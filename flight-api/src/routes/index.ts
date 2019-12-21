import { Application } from 'express'

export abstract class Route{
  constructor(protected app: Application){}
  abstract createRoutes()
}