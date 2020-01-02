import * as uuidv4 from 'uuid/v4'
import { is, Easily } from 'easy-injectionjs'
import { DBConstants } from './constants'
import * as Redis from 'ioredis'

export class DataService {
  private client: Redis.Redis

  constructor(opts: Redis.RedisOptions = is(DBConstants.REDIS_CONFIG) || {
                                          port: 6379,
                                          host: "192.168.1.1",
                                          password: is(DBConstants.REDIS_PASSWORD)
                                          }) {
    this.client = new Redis(opts)
  }

  public save<T>(data: T, key?:string): Promise<T> {
    return new Promise((resolve, reject) => {
      // some duck typing to get id
      let idFields = Object.keys(data).filter(x => x.match(new RegExp('.*(i|I)(d|D)')))

      if (idFields || idFields.length < 1) {
        throw new Error("Data doesn't have an id field.")
      }

      let idField: string =  idFields.length == 1 ? idFields[0]: idFields.reduce((x,y) => (x.length < y.length) ? x:y)
      let id: string = uuidv4()
      data[idField] = id

      this.client.set((key) ? key: id, JSON.stringify(data), (err: Error, _: String) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public find(id: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.client.get(id, (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(JSON.parse(res))
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
