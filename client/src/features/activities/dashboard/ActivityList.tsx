import React from 'react'
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { IActivity } from '../../../interfaces/activity'

interface IActivityListProps {
  activities: IActivity[];
  onSelectActivity: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ActivityList({ activities, onSelectActivity, onDelete }: IActivityListProps): JSX.Element {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity: IActivity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'> {activity.title} </Item.Header>
              <Item.Meta>{new Date(activity.date).toDateString()} </Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button floated='right' content='View' color='blue' onClick={() => onSelectActivity(activity.id)} />
                <Button floated='right' content='Delete' color='red' onClick={() => onDelete(activity.id)} />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>)
        )}
      </Item.Group>
    </ Segment>
  );
}