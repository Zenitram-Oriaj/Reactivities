import React from 'react';
import { Grid } from 'semantic-ui-react';
import ContentLoader from '../../../app/layout/loader';
import { IActivity } from '../../../interfaces/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface IActivityDashboardProps {
  activities: IActivity[];
  activity?: IActivity;
  onSelectActivity: (id: string) => void;
  onCancelSelect: () => void;
  onFormOpen: (id: string) => void;
  onFormClose: () => void;
  editMode: boolean;
  onCreateOrEdit: (item: IActivity) => void;
  onDelete: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({
  activities, activity, onSelectActivity, onCancelSelect, editMode, onFormOpen, onFormClose, onCreateOrEdit, onDelete, submitting
}: IActivityDashboardProps): JSX.Element {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} onSelectActivity={onSelectActivity} onDelete={onDelete} submitting={submitting} />
      </Grid.Column>
      <Grid.Column width="6">
        {!editMode && activity && <ActivityDetails activity={activity} onCancelSelect={onCancelSelect} onFormOpen={onFormOpen} />}
        {editMode && <ActivityForm activity={activity} onFormClose={onFormClose} onCreateOrEdit={onCreateOrEdit} submitting={submitting} />}
      </Grid.Column>
    </Grid>
  )
}