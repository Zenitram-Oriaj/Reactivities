import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface INavBarProps {
  onFormOpen: (id?: string) => void;
}

export default function NavBar({ onFormOpen }: INavBarProps) {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px'}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Actvities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={() => onFormOpen()} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}