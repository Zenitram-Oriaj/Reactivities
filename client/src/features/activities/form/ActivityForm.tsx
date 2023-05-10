import React, { useState, ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../interfaces/activity';

interface IActivityFormProps {
  activity?: IActivity;
  onFormClose: () => void;
  onCreateOrEdit: (item: IActivity) => void;
  submitting: boolean;
}

export default function ActivityForm({ activity, onFormClose, onCreateOrEdit, submitting }: IActivityFormProps): JSX.Element {
  const initState: IActivity = activity ?? {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  }

  const [form, setForm] = useState<IActivity>(initState);

  function onInputChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  }

  function onSubmit(): void {
    console.log(form);
    onCreateOrEdit(form);
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
        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' onClick={onFormClose} />
      </Form>
    </Segment>
  )
}