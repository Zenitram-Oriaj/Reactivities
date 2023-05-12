import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../../stores/store';


function NavBar() {
  const { activityStore } = useStore();
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px'}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Actvities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={() => activityStore.openForm()} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default observer(NavBar);