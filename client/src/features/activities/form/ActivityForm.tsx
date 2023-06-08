import React, { useState, useEffect } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../../app/interfaces/activity';
import { Activity } from '../../../app/stores/activity.store';
import { useStore } from '../../../app/stores/store';
import { useNavigate, useParams } from 'react-router-dom';
import ContentLoader from '../../../app/layout/loader';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormTextInput from '../../../app/common/form/form.text.input';
import FormTextArea from '../../../app/common/form/form.text.area';
import FormSelectInput from '../../../app/common/form/form.select.input';
import { categoryOptions } from '../../../app/common/options/category.options';
import FormDateInput from '../../../app/common/form/form.date.input';


export default observer(function ActivityForm(): JSX.Element {
  const { activityStore } = useStore();
  const {id} = useParams();
  const navigate = useNavigate();
  const {editActivity, createActivity, loading, loadActivity, loadingInitial} = activityStore;

  const [activity, setForm] = useState<IActivity>(new Activity());

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required('The activity category is required'),
    date: Yup.string().required('The activity date is required').nullable(),
    venue: Yup.string().required('The activity venue is required'),
    city: Yup.string().required('The activity city is required')
  });

  function onFormSubmit(act: IActivity): void {
    console.log(act);
    if(!act.id.length) {
      act.id = uuid();
      createActivity(act).then(() => navigate(`/activities/${act.id}`));
    } else {
      editActivity(act).then(() => navigate(`/activities/${act.id}`));
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
      <Header content='Activity Details' sub color='teal'/>
      <Formik enableReinitialize initialValues={activity} validationSchema={validationSchema} onSubmit={(values: IActivity) => onFormSubmit(values)}>
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit}>
              <FormTextInput name='title' placeholder='Title'/>
              <FormTextArea rows={3} placeholder='Description' name='description' />
              <FormSelectInput options={categoryOptions} placeholder='Category' name='category' />
              <FormDateInput 
                placeholderText='Date' 
                name='date'
                showTimeSelect
                timeCaption='time'
                dateFormat='MMMM d, yyyy h:mm aa'

              />
              <Header content='Location Details' sub color='teal'/>
              <FormTextInput placeholder='City'name='city' />
              <FormTextInput placeholder='Venue' name='venue' />
              <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
              <Button floated='right' type='button' content='Cancel' onClick={() => onCancel()}/>
            </Form>
        )}
      </Formik>
    </Segment>
  )
})