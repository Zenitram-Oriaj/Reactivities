import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../interfaces/activity';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.tsx';
import agent from '../../api/agent';
import ContentLoader from './loader';

function App(): JSX.Element {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activity, setActivity] = useState<IActivity | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  async function onCreateOrEdit(item: IActivity): Promise<void> {
    setSubmitting(true);
    try {
      if (item.id) {
        await agent.Activities.update(item);
        setActivities([...activities.filter((act: IActivity) => act.id !== item.id), item]);
      } else {
        item.id = uuid();
        await agent.Activities.create(item);
        setActivities([...activities, item]);
      }
      setActivity(item);
    } catch (err: unknown) {
      console.error(err);
    }
   
    setEditMode(false);
    setSubmitting(false);
  }

  async function onDelete(id: string): Promise<void> {
    setSubmitting(true);
    try {
      await agent.Activities.delete(id);
      setActivities([...activities.filter((act: IActivity) => act.id !== id)]);
    } catch (err: unknown) {
      console.error(err);
    }
    setSubmitting(false);
  }

  useEffect(() => {
    agent.Activities.list()
      .then((data: IActivity[]) => {
        data.forEach((act: IActivity) => act.date = act.date.split('T')[0]);
        setActivities(data);
        setloading(false);
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
    onDelete,
    submitting
  }

  if (loading) return (<ContentLoader />)
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