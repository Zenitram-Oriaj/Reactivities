import React, { useState, MouseEvent, SyntheticEvent } from 'react'
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { IActivity } from '../../../interfaces/activity'

interface IActivityListProps {
  activities: IActivity[];
  onSelectActivity: (id: string) => void;
  onDelete: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList({ activities, onSelectActivity, onDelete, submitting }: IActivityListProps): JSX.Element {
  const [target, setTarget] = useState<string>('');

  function onHandleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string): void {
    setTarget(e.currentTarget.name);
    onDelete(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity: IActivity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'> {activity.title} </Item.Header>
              <Item.Meta>{activity.date} </Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button floated='right' content='View' color='blue' onClick={() => onSelectActivity(activity.id)} />
                <Button
                  name={activity.id}
                  loading={submitting && target === activity.id}
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
}