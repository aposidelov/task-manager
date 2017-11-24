import { combineReducers } from 'redux';
import { tasks, taskHandling, sendTask } from './tasks';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
    routerReducer,
    tasks,
    taskHandling,
    sendTask
});

export default rootReducer;