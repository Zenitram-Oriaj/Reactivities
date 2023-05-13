import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ContentLoader from '../../../app/layout/loader';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';


export default observer(function ActivityDetails(): JSX.Element {
  const { activityStore } = useStore();
  const { id } = useParams();
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return (<ContentLoader />);
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityDetailedSidebar activity={activity}/>
      </Grid.Column>
    </Grid>
  );
});