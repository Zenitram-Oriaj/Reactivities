import { IActivity } from './../interfaces/activity';
import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";


export class Activity implements IActivity {
  public id: string = '';
  public title: string = '';
  public date: string = '';
  public description: string = '';
  public category: string = '';
  public city: string = '';
  public venue: string = '';
  constructor(activity?: IActivity) {
    this.id = activity?.id ?? '';
  }
}

export default class ActivityStore {
  public activityRegistry = new Map<string, IActivity>();
  public activity?: IActivity;
  public editMode: boolean = false;
  public loadingInitial: boolean = true;
  public loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public get activities(): IActivity[] {
    return [...this.activityRegistry.values()];
  }

  public get activitiesByDate(): IActivity[] {
    return [...this.activityRegistry.values()].sort((a:IActivity, b:IActivity) => Date.parse(a.date) - Date.parse(b.date));
  }

  public loadActivities = async(): Promise<void> => {
    try {
      const activities = await agent.Activities.list();
      if (!activities.length) {
        this.setLoadingInitial(false);
        return;
      }

      activities.forEach((act: IActivity) => {
        act.date = act.date.split('T')[0];
        this.activityRegistry.set(act.id, act);
      });
    } catch (e: unknown) {
      console.error(e);
    }
    this.setLoadingInitial(false);
  }

  public setLoadingInitial = (state: boolean): void => {
    this.loadingInitial = state;
  }

  public selectActivity = (id: string): void => {
    this.activity = this.activityRegistry.get(id);
  }

  public cancelSelectedActivity = (): void => {
    this.activity = undefined;
  }

  public openForm = (id?: string): void => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.setEditMode(true);
  }

  public closeForm = (): void => {
    this.setEditMode(false);
  }

  public setActivity = (activity?: IActivity): void => {
    this.activity = activity;
  }

  public setEditMode = (state: boolean): void => {
    this.editMode = state;
  }

  public setLoading = (state: boolean): void => {
    this.loading = state;
  }

  public createActivity = async (activity: IActivity): Promise<void> => {
    this.setLoading(true);
    try {
      activity.id = uuid();
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.setActivity(activity);
        this.setLoading(false);
        this.closeForm();
      })
    } catch (e: unknown) {
      console.error(e);
      this.setLoading(false);
    }
  }

  public editActivity = async (activity: IActivity): Promise<void> => {
    this.setLoading(true);
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.setActivity(activity);
        this.setLoading(false);
        this.closeForm();
      });
    } catch (e: unknown) {
      console.error(e);
      this.setLoading(false);
    }
  }

  public deleteActivity = async (id: string): Promise<void> => {
    this.setLoading(true);
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if(this.activity?.id === id) this.cancelSelectedActivity();
        this.setLoading(false);
      })
    } catch (err: unknown) {
      console.error(err);
      this.setLoading(false);
    }
  }
}