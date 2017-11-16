import React, { Component } from 'react';
import {Grid } from 'react-bootstrap';

import TodoList from "../components/TodoList";

import AddTodo from "../components/AddTodo";
import todoAction from "../actions/todo";

import { connect } from "react-redux";
import {reset} from 'redux-form';


class App extends Component {
  render() {
    const {
      addToDo, 
      todoList, 
      delTodo, 
      isEditTodo, 
      willEditTitle,
      didEditTitle,
      willEditBody,
      didEditBody 
    } = this.props;

    return (
      <div className="App">
        <Grid>         
          <AddTodo onSubmit={addToDo}/>
          <TodoList 
            todoList= {todoList} 
            delTodo={delTodo} 
            isEditTodo= {isEditTodo}
            willEditTitle= {willEditTitle} 
            didEditTitle= {didEditTitle} 
            willEditBody= {willEditBody} 
            didEditBody= {didEditBody}
            />
        </Grid>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoList: state.todo,
    isEditTodo: state.edit
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: data => {
      dispatch(todoAction.add(data));
      dispatch(reset('AddTodo'));
    },
    delTodo: id => dispatch(todoAction.del(id)),
    willEditTitle: id => dispatch(todoAction.willEditTitle(id)),
    didEditTitle: obj => dispatch(todoAction.didEditTitle(obj)),
    willEditBody: id => dispatch(todoAction.willEditBody(id)),
    didEditBody: obj => dispatch(todoAction.didEditBody(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
