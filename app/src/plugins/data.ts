import _Vue from 'vue';

export interface AuthenticationOptions {

}

export interface DataOptions {
  apaiPath?: string,
  qraphqlPath?: string,
  authenticationOptions?: string
}

export const DataPlugin = (Vue: typeof _Vue, options?: any) => {
}