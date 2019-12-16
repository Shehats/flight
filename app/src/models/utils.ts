// @ts-ignore
import * as YAML from 'yaml'
import * as fs from 'fs'
import { Base, FlightModel } from './'

export type TargetClass<T extends Base> = new (...args: any[]) => T

export const ACTUAL_NAME = 'ACTUAL_NAME', VALUE = 'VALUE'

export const getSetters = (obj: new(...args:any[]) => {}): string[] => {
  let clazz = Object.getPrototypeOf(new obj())
  return Object.keys(clazz).filter((name: string) => 
    // @ts-ignore
    typeof Object.getOwnPropertyDescriptor(clazz, name)["set"] === "function")
}

export const getDataMap = (obj: Object): Map<string, any> => {
  let ret: Map<string, any> = new Map()
  Object.keys(obj).forEach(k => {
    // @ts-ignore
    ret.set(k.toLowerCase(), { [ACTUAL_NAME]: k, [VALUE]: obj[k] })
  })
  return ret
}

export const constructModelsURLsFromYaml = <T extends Base>(path: string, targets: TargetClass<T>[]): any => {
  const _file = fs.readFileSync(path, {'encoding': 'utf8'})
  const _modelData = YAML.parse(_file)
  console.log(_modelData)
  let soFar = {}
  Object.keys(_modelData).forEach((k: string) => {
    let m = _modelData[k]
    // @ts-ignore
    soFar[k] = getDataMap(m)
  })
  
  let endpoints = {}
  targets.forEach(target => {
    let targetSetters = getSetters(target)
    let targetUrls = {}
    let name = target.name
    if (name != Base.name) {
      targetSetters = getSetters(Base).concat(targetSetters)
    }
    
    targetSetters.forEach(x => {
      // @ts-ignore
      if (soFar[name].has(x.toLowerCase())) {
        // @ts-ignore
        targetUrls[x] = soFar[name].get(x.toLowerCase())[VALUE]
      }
    })
    // @ts-ignore
    endpoints[name] = targetUrls
  })
  return endpoints
}

const getClassName = (obj: any): string => {
  var funcNameRegex = /function (.{1,})\(/;
  var results = (funcNameRegex).exec(obj.constructor.toString());
  return (results && results.length > 1) ? results[1] : "";
}

export const getModeUrls = <T extends Base> (childClass: TargetClass<T>): string[] => {
  // get subclasses
  let classNames = [];
  let obj = Object.getPrototypeOf(new childClass());
  let className: string;
  while ((className = getClassName(obj)) !== "Object") {
    classNames.push(className);
    obj = Object.getPrototypeOf(obj);
  }
  return classNames;
}

console.log(constructModelsURLsFromYaml('/home/sal/Projects/flight/flight-app/src/api/models.yml', [Base, FlightModel]))