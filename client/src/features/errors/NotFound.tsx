import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(): JSX.Element {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
          Oops - we were not able to locate what you requested!
      </Header>
      <Segment.Inline>
        <Button as={Link} to='/activities'>
          Return To Activities
        </Button>
      </Segment.Inline>
    </Segment>
  )
}