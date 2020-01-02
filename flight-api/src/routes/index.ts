import { Express } from 'express'

export abstract class Route{
  constructor(protected app: Express){}
  abstract createRoutes()
}