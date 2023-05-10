import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../../activity';
import { Header, List } from 'semantic-ui-react';

function App(): JSX.Element {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/activities')
      .then((res: AxiosResponse) => {
        setActivities(res.data);
      })
      .catch((reason: unknown) => { console.error(reason) });
  }, []);

  return (
    <div className="App">
      <Header as='h2' icon='users' content='Reactivities'></Header>
      <List>
        {activities.map((activity: IActivity, idx: number) => (<List.Item key={idx} >{activity.title}</List.Item>))}
      </List>
    </div>
  );
}

export default App;