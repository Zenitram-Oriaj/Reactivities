import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../interfaces/activity';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.tsx';

function App(): JSX.Element {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activity, setActivity] = useState<IActivity | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);

  function onSelectActivity(id: string): void {
    setActivity(activities.find((act: IActivity) => act.id === id));
  }

  function onCancelSelect(): void {
    setActivity(undefined);
  }

  function onFormOpen(id?: string): void {
    id ? onSelectActivity(id) : onCancelSelect();
    setEditMode(true);
  }
  function onFormClose(): void {
    setEditMode(false);
  }

  function onCreateOrEdit(item: IActivity): void {
    item.id ? setActivities([...activities.filter((act: IActivity) => act.id !== item.id), item]) : setActivities([...activities, { ...item, id: uuid() }]);
    setEditMode(false);
    setActivity(item);
  }

  function onDelete(id: string): void {
    setActivities([...activities.filter((act: IActivity) => act.id !== id)]);
    setEditMode(false);
  }

  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then((res: AxiosResponse) => {
        setActivities(res.data);
      })
      .catch((reason: unknown) => { console.error(reason) });
  }, []);

  const props = {
    activities,
    activity,
    onSelectActivity,
    onCancelSelect,
    onFormOpen,
    onFormClose,
    editMode,
    onCreateOrEdit,
    onDelete
  }
  return (
    <>
      <NavBar onFormOpen={onFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard {...props} />
      </Container>
    </>
  );
}

export default App;