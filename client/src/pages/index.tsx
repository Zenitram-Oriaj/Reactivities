import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function HomePage(): JSX.Element {
  const {userStore} = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text style={{marginTop: '7em'}}>
        <Header as="h1" inverted> 
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{marginBottom: '12px'}}/>
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome To Reactivities"/>
            <Button as={Link} to="/activities" size="huge" inverted content="Go To Activities!" />
          </>
        ) : (
          <>
            <Button as={Link} to="/login" size="huge" inverted content="Login" />
            <Button as={Link} to="/register" size="huge" inverted content="Register" />
          </>
        )}
        
        

      </Container>
    </Segment>
    
  )
})
