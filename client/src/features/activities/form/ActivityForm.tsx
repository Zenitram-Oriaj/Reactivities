import React, { useState, ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../interfaces/activity';
import { Activity } from '../../../stores/activity.store';
import { useStore } from '../../../stores/store';


export default observer(function ActivityForm(): JSX.Element {
  const { activityStore } = useStore();
  const { activity, closeForm, editActivity, createActivity, loading } = activityStore;

  const initState: IActivity = activity ?? new Activity();

  const [form, setForm] = useState<IActivity>(initState);

  function onInputChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  }

  function onSubmit(): void {
    console.log(form);
    form.id.length ? editActivity(form) : createActivity(form);
  }

  return (
    <Segment clearing>
      <Form onSubmit={onSubmit}>
        <Form.Input placeholder='Title' value={form.title} name='title' onChange={onInputChange} />
        <Form.TextArea placeholder='Description' value={form.description} name='description' onChange={onInputChange} />
        <Form.Input placeholder='Category' value={form.category} name='category' onChange={onInputChange} />
        <Form.Input type='date' placeholder='Date' value={form.date} name='date' onChange={onInputChange} />
        <Form.Input placeholder='City' value={form.city} name='city' onChange={onInputChange} />
        <Form.Input placeholder='Venue' value={form.venue} name='venue' onChange={onInputChange} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
      </Form>
    </Segment>
  )
})