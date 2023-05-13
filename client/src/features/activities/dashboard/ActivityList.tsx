import React, { Fragment } from 'react'
import { Segment, Item, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../interfaces/activity'
import { useStore } from '../../../stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList(): JSX.Element {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {activities.map((activity: IActivity) => <ActivityListItem activity={activity} key={activity.id} />)}
        </Fragment>
      ))}
    </>
  );
})