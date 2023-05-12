import React from 'react';
import { Card, Image, Button, ButtonGroup } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';


export default function ActivityDetails(): JSX.Element {
  const { activityStore } = useStore();
  const { activity, openForm, cancelSelectedActivity } = activityStore;

  if (!activity) return (<></>);
  return (
    <Card>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths='2'>
          <Button basic color='blue' content='Edit' onClick={() => openForm(activity.id)} />
          <Button basic color='grey' content='Cancel' onClick={() => cancelSelectedActivity()} />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
}