import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);