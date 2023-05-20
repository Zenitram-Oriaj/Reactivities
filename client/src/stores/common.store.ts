import { makeAutoObservable } from "mobx";
import { IServerError } from "../interfaces/server.error";

export default class CommonStore {
  public error: IServerError | null = null;

  constructor() {
      makeAutoObservable(this);
  }

  public setServerError(error: IServerError): void {
    this.error = error;
  }
}