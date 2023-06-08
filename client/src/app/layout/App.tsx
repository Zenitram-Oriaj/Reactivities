import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import HomePage from "../pages";
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import Loader from './loader';
import ModalContainer from '../common/modals/ModalContainer';

function App(): JSX.Element {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) userStore.getUser().finally(() => commonStore.setAppLoader());
    else commonStore.setAppLoader();
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return (<Loader content='Loading Application...'/>);
  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      { location.pathname === '/' ? <HomePage /> : (
        <> 
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);