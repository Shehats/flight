import * as axios from 'axios'


export interface DefualtRes{}

export class HttpClient {
  private client: axios.AxiosStatic

  constructor(){
    this.client = axios.default
  }

  public get(url: string, config?: any): Promise<any> {
    return this.client.get(url, config)
  }

  public post(url: string, data?: any, config?: any): Promise<any> {
    return this.client.post(url, data, config)
  }

  public static getBody<T>(data: any): T {
    let cData = <axios.AxiosResponse<any>>data
    return cData.data
  }

  public static getHeader(data: any): any {
    let cData = <axios.AxiosResponse<any>>data
    return cData.headers
  }
}