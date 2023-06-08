import { makeAutoObservable, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../interfaces/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/routes";

export default class UserStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public get isLoggedIn(): boolean {
    return !! this.user;
  }

  public async login(cred: IUserFormValues): Promise<void> {
    try {
      const user = await agent.Account.login(cred);
      if(!user) return;
      store.commonStore.setToken(user.token);
      runInAction(() => this.user = {...user});
      router.navigate('/activities');
      store.modalStore.closeModal();
    } catch(ex: unknown) {
      throw ex;
    }
  }

  public async register(cred: IUserFormValues): Promise<IUser | null> {
    try {
      const user = await agent.Account.register(cred);
      if(!user) return null;
      store.commonStore.setToken(user.token);
      runInAction(() => this.user = {...user})
      return user;
    } catch(ex: unknown) {
      throw ex;
    }
  }

  public async logout(): Promise<void> {
    try {
      await agent.Account.logout();
      store.commonStore.setToken(null);
      router.navigate('/');
    } catch(ex: unknown) {
      throw ex;
    }
  }


  public async getUser(): Promise<IUser | null> {
    try {
      const user = await agent.Account.current();
      runInAction(() => this.user = {...user});
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
}