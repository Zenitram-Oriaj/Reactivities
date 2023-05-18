import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(): JSX.Element {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text style={{marginTop: '7em'}}>
        <Header as="h1" inverted> 
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{marginBottom: '12px'}}/>
          Reactivities
        </Header>
        <Header as="h2" inverted content="Welcome To Reactivities"/>
        <Button as={Link} to="/activities" size="huge" inverted content="Take Me To Activities" />
      </Container>
    </Segment>
    
  )
}