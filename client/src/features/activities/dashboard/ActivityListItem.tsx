import { observer } from "mobx-react-lite";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../interfaces/activity";
import { format } from "date-fns";

interface IActivityListItemProps {
  activity: IActivity;
}

export default observer(function ActivityListItem({
  activity,
}: IActivityListItemProps): JSX.Element {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size="tiny"
              circular
              src={"/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by{" "}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(new Date(activity.date), 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
          Attendees Go Here
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
            as={Link}
            to={`/activities/${activity.id}`}
            color='teal'
            floated='right'
            content='View'
        />
      </Segment>
    </Segment.Group>
  );
});
