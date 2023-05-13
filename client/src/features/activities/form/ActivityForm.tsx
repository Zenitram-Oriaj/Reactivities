import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../../interfaces/activity';
import { Activity } from '../../../stores/activity.store';
import { useStore } from '../../../stores/store';
import { useNavigate, useParams } from 'react-router-dom';
import ContentLoader from '../../../app/layout/loader';


export default observer(function ActivityForm(): JSX.Element {
  const { activityStore } = useStore();
  const {id} = useParams();
  const navigate = useNavigate();
  const {editActivity, createActivity, loading, loadActivity, loadingInitial} = activityStore;

  const [activity, setForm] = useState<IActivity>(new Activity());

  function onInputChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = evt.target;
    setForm({ ...activity, [name]: value });
  }

  function onSubmit(): void {
    console.log(activity);
    if(!activity.id.length) {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    } else {
      editActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  }

  function onCancel(): void {
    if(activity.id.length) navigate(`/activities/${activity.id}`);
    else navigate('/activities');
  }

  useEffect(() => {
    if(id?.length) loadActivity(id).then((activity: IActivity) => setForm(activity));
  },[id, loadActivity])


  if(loadingInitial) return (<ContentLoader />);
  return (
    <Segment clearing>
      <Form onSubmit={onSubmit}>
        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={onInputChange} />
        <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={onInputChange} />
        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={onInputChange} />
        <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={onInputChange} />
        <Form.Input placeholder='City' value={activity.city} name='city' onChange={onInputChange} />
        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={onInputChange} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' onClick={() => onCancel()}/>
      </Form>
    </Segment>
  )
})