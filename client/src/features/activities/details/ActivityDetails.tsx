import React from 'react';
import { Card, Image, Button, ButtonGroup } from 'semantic-ui-react';
import { IActivity } from '../../../interfaces/activity';

interface IActivityDetailsProps {
  activity?: IActivity;
  onCancelSelect: () => void;
  onFormOpen: (id: string) => void;
}

export default function ActivityDetails({ activity, onCancelSelect, onFormOpen }: IActivityDetailsProps): JSX.Element {
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
          <Button basic color='blue' content='Edit' onClick={() => onFormOpen(activity.id)} />
          <Button basic color='grey' content='Cancel' onClick={() => onCancelSelect()} />
        </ButtonGroup>

      </Card.Content>
    </Card>
  );
}