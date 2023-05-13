import React, { useEffect } from 'react';
import { Card, Image, Button, ButtonGroup } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ContentLoader from '../../../app/layout/loader';
import { Link } from 'react-router-dom';


export default observer(function ActivityDetails(): JSX.Element {
  const { activityStore } = useStore();
  const { id } = useParams();
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return (<ContentLoader />);
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
          <Button basic color='blue' content='Edit' as={Link} to={`/activities/manage/${activity.id}`} />
          <Button basic color='grey' content='Cancel' as={Link} to='/activities' />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
});