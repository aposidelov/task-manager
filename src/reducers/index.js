import { combineReducers } from "redux";
import {todo, edit} from "./todoList";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  todo,
  edit,
  form: formReducer
});

export default rootReducer;