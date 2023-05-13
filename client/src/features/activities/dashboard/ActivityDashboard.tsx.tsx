import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/store';
import ActivityList from './ActivityList';
import ContentLoader from '../../../app/layout/loader';


export default observer(function ActivityDashboard(): JSX.Element {
  const { activityStore } = useStore();
  const {loadActivities, activityRegistry} = activityStore;

  useEffect(() => {
    if(activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry]);


  if (activityStore.loadingInitial) return (<ContentLoader />)
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity Filter</h2>
      </Grid.Column>
    </Grid>
  )
})