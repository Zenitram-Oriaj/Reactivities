import React, { useState, MouseEvent, SyntheticEvent } from 'react'
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../interfaces/activity'
import { useStore } from '../../../stores/store';
import { Link } from 'react-router-dom';


export default observer(function ActivityList(): JSX.Element {
  const { activityStore } = useStore();
  const { activitiesByDate, loading, deleteActivity } = activityStore;
  const [target, setTarget] = useState<string>('');

  
  function onHandleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string): void {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity: IActivity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'> {activity.title} </Item.Header>
              <Item.Meta>{activity.date} </Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`} />
                <Button
                  name={activity.id}
                  loading={loading && target === activity.id}
                  floated='right'
                  content='Delete'
                  color='red'
                  onClick={(e: MouseEvent<HTMLButtonElement>) => onHandleDelete(e, activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>)
        )}
      </Item.Group>
    </ Segment>
  );
})