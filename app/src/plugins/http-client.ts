import { Observable, Observer, observable } from 'rxjs'
import axios from 'axios'
import { Base, getSetters, getDataMap, TargetClass } from '../models'

let createObjectFromPayload = <T extends Base> (data: Object, target: TargetClass<T>): T => {
  let _setters = getSetters(target), _dataMap = getDataMap(data)
  let ret = new target()

  if (_setters) {
    _setters.forEach(setter => {
      if (_dataMap.has(setter.toLowerCase())) {
        // @ts-ignore
        ret[setter](_dataMap.get(setter.toLowerCase()))
      }
    })
  } else {
    Object.keys(target).forEach(k => {
      if (_dataMap.has(k.toLowerCase())) {
        // @ts-ignore
        ret[k] = _dataMap.get(k.toLowerCase())
      }
    })
  }
  return ret
}


export class HttpClient {
  public getData <T extends Base> (url: string, target?: TargetClass<T>): Observable<T[]|any[]> {
    return Observable.create((observer: Observer<T[]| any[]>) => {
      axios.get(url)
      .then(res => {
          observer.next(res.data.map((data: any) => (target) ? createObjectFromPayload(data, target): data))
          observer.complete()
      })
      .catch(err => {
        observer.error(err)
      })
    })
  }
  
  public getDataById<T extends Base> (url:string, id?: number|string, target?: TargetClass<T>): Observable<T|any> {
    return Observable.create((observer: Observer<T|any>) => {
      axios.get(url).then(res => {
        observer.next((target)? createObjectFromPayload(res.data, target): res.data)
        observer.complete()
      }).catch(err => {
        observer.error(err)
      })
    })
  }

  public postData <T extends Base> (target: T): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      axios.post(target.createUrl, target).then(res => {
        observer.next(res.data)
        observer.complete()
      }).catch(err => {
        observer.error(err)
      })
    })
  }

  public putData <T extends Base> (target: T): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      axios.put(target.updateUrl, target).then(res => {
        observer.next(res.data)
        observer.complete()
      }).catch(err => {
        observer.error(err)
      })
    })
  }

  public deleteData<T extends Base> (target: T): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      axios.delete(target.deleteUrl).then(res => {
        observer.next(res.data)
        observer.complete()
      }).catch(err => {
        observer.error(err)
      })
    })
  }

  public deleteById<T extends Base> (url: string, id?:number|string): Observable<any|void> {
    return Observable.create((observer: Observer<any>) => {
      axios.delete((id) ? `${url}/${id}`: url).then(res => {
        observer.next(res.data)
        observer.complete()
      }).catch(err => {
        observer.error(err)
      })
    })
  }
}

