import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.tsx';
import ContentLoader from './loader';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

function App(): JSX.Element {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);


  if (activityStore.loadingInitial) return (<ContentLoader />)
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);