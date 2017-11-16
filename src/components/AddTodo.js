import React from "react";
import { Field, reduxForm } from 'redux-form';
import {Row, Col} from 'react-bootstrap';

//-styles-------------------
const formStyle= {
  width: '30%',
  height: '200px',
  backgroundColor: '#E0EEE0',
  padding: '5px 15px',
  marginBottom: '20px',
  marginTop: '20px'
};
const inputStyle = {
  width: '100%',
  marginBottom: '10px'
};
//-------------------------------

const AddTodo = props => {
  const {handleSubmit, pristine, submitting } = props;
    
  return (
       <form onSubmit={handleSubmit} style= {formStyle}  >
        <div>
          <label>Title</label>
          <div>
            <Field
              style= {inputStyle}
              name="title"
              component="input"
              type="text"
              placeholder="Title of todo"
            />
          </div>
        </div>

        <div>
          <label>Description</label>
          <div>
            <Field name="description" component="textarea" style= {inputStyle}/>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting} >Submit</button>
        </div>
      </form>
  );
};


export default reduxForm({form: 'AddTodo'})(AddTodo);

