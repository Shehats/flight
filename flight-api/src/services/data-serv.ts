import * as redis from 'redis'
import * as uuidv4 from 'uuid/v4'
import { is, Easily } from 'easy-injectionjs'
import { DBConstants } from './constants'

export class DataService {
  private client: redis.RedisClient

  constructor(redisPassword: string) {
    this.client = redis.createClient({ password: redisPassword })
  }

  public save(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.set(uuidv4(), JSON.stringify(data), (err, reply) => {
        if (err) {
          return reject(err)
        }
        return resolve(reply)
      })
    })
  }

  public find(id: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.client.get(id, (err, reply) => {
        if (err) {
          return reject(err)
        }
        return resolve(reply)
      })
    })
  }

  public delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let deleted = this.client.del(id)
      return (deleted) ? resolve(deleted): reject(new Error(`Failed delete object with key: ${id}`))
    })
  }
}

export const getContextDataService = (): DataService => {
  let dataService: DataService = is(DataService)
  if (!dataService) {
    dataService = new DataService(is(DBConstants.REDIS_PASSWORD))
    Easily(DataService.name, dataService)
  }
  return dataService
}
