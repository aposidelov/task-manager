import React from 'react';
import { Route } from 'react-router';

import TaskList from '../containers/TaskList';
import Task from '../containers/Task';


const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={TaskList}/>
      <Route path="/:taskId" component={Task}/>
    </div>
  )
};

export default Routes;
