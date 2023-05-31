import { makeAutoObservable } from "mobx";
import { IServerError } from "../interfaces/server.error";


export type StorageOperation = 'add' | 'remove' | 'get';

export default class CommonStore {
  public error: IServerError | null = null;
  public token: string | null = null;
  public appLoader: boolean = false;

  constructor() {
      makeAutoObservable(this);
  }

  public setServerError(error: IServerError): void {
    this.error = error;
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  public setAppLoader(): void {
    this.appLoader = true;
    this.token = localStorage.getItem('jwt');
  }

  public setLocalStorage(opt: StorageOperation, key: string, value?: any): string | boolean | null {
    switch(opt) {
      case 'add': {
        localStorage.setItem(key, value);
        return true;
      }
      case 'get': {
        return localStorage.getItem('jwt');
      }
      default: {
        return false;
      }
    }
  }
}