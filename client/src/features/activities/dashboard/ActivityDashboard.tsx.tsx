import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/store';
import ActivityList from './ActivityList';
import ContentLoader from '../../../app/layout/loader';
import ActivityFilters from './ActivityFilters';


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
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  )
})