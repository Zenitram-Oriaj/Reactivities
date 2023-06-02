import { makeAutoObservable, reaction } from "mobx";
import { IServerError } from "../interfaces/server.error";


export type StorageOperation = 'set' | 'remove' | 'get';

export default class CommonStore {
  public error: IServerError | null = null;
  public token: string | null = localStorage.getItem('jwt');
  public appLoader: boolean = false;

  constructor() {
      makeAutoObservable(this);
      reaction(
        () => this.token,
        token => {
          if(token) localStorage.setItem('jwt', token);
          else localStorage.removeItem('jwt');  
        }
        )
  }

  public setServerError(error: IServerError): void {
    this.error = error;
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  public setAppLoader(): void {
    this.appLoader = true;
    this.token = this.storage('get', 'jwt');
  }

  public storage(opt: StorageOperation, key: string, value?: any): string | null {
    switch(opt) {
      case 'set': {
        localStorage.setItem(key, value);
        return value;
      }
      case 'get': {
        return localStorage.getItem(key);
      }
      default: {
        localStorage.removeItem(key);
        return '';
      }
    }
  }
}