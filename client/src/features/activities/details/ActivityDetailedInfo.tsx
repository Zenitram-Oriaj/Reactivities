import React from "react";
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';

import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../interfaces/activity';


interface Props {
    activity: IActivity
}

export default observer(function ActivityDetailedInfo({ activity }: Props) {
  return( <></>)
});