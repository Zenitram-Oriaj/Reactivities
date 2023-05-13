import React from "react";
import { observer } from "mobx-react-lite";
import { IActivity } from "../../../interfaces/activity";

interface Props {
  activity: IActivity
}

export default observer(function ActivityDetailedSidebar ({activity}: Props) {
  return(<></>)
});