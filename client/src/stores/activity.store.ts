import { IActivity } from './../interfaces/activity';
import { makeAutoObservable, runInAction } from "mobx";
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
  public loadingInitial: boolean = false;
  public loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public get activities(): IActivity[] {
    return [...this.activityRegistry.values()];
  }

  public get activitiesByDate(): IActivity[] {
    return Array.from(this.activityRegistry.values()).sort((a:IActivity, b:IActivity) => Date.parse(a.date) - Date.parse(b.date));
  }

  public get groupedActivities() {
    return Object.entries(this.activitiesByDate.reduce((activities, activity: IActivity) => {
      const date = activity.date;
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities;
    }, {} as {[key: string]: Activity[]}));
  }

  public loadActivities = async(): Promise<void> => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      if (!activities.length) {
        this.setLoadingInitial(false);
        return;
      }

      activities.forEach((act: IActivity) => {
        this.setActivity(act);
      });
    } catch (e: unknown) {
      console.error(e);
    }
    this.setLoadingInitial(false);
  }

  public loadActivity = async(id: string): Promise<IActivity> => {
    try {
      let activity = this.getActivity(id);
      if(activity) {
        this.activity = {...activity};
        return activity;
      }
      this.setLoadingInitial(true);
      activity = await agent.Activities.details(id);
      if(activity) {
        this.setActivity(activity);
        this.activity = {...activity};
        this.setLoadingInitial(false);
        return activity;
      }
    } catch (e: unknown) {
      console.error(e);
    }
    this.setLoadingInitial(false);
    return new Activity();
  }

  public clearActivity = (): void => {
    this.activity = new Activity();
  }

  private getActivity = (id: string): IActivity | undefined => this.activityRegistry.get(id);
  
  private setActivity = (activity: IActivity): void => {
    activity.date = activity.date.split('T')[0];
    this.activityRegistry.set(activity.id, activity);
  }

  public setLoadingInitial = (state: boolean): void => {
    this.loadingInitial = state;
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
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = {...activity};
        this.setLoading(false);
        this.setEditMode(false);
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
        this.activity = {...activity};
        this.setLoading(false);
        this.setEditMode(false);
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
        this.setLoading(false);
      })
    } catch (err: unknown) {
      console.error(err);
      this.setLoading(false);
    }
  }
}