import { createContext, useContext } from "react";
import ActivityStore from "./activity.store";
import CommonStore from "./common.store";
import UserStore from "./user.store";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}