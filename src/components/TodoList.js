import React from "react";
import {Grid, Row, Col, Button, Pagination } from 'react-bootstrap';
import '../index.css';

//--- styles------------
const filterStyle = {
  padding: '5px 10%',
  marginRight: '-10%',
  minHeight: '200px',
  backgroundColor: '#E0EEE0'
};
const inputStyle = {
  width: '100%'
};

const todoStyle = {
  padding: '5px 5% 0px',
  minHeight: '200px',
  backgroundColor: '#E0EEE0',
  position: 'relative',
  marginBottom: '20px'
};
const descriptionStyle = {
  marginBottom: '20px',
  maxHeight: '100px',
  overflow: 'auto',
  cursor: 'pointer'
};
const delButtStyle = {
  position: 'absolute',
  top: '5px',
  right: '15px',
  cursor: 'pointer'
};
const createdStyle = {
  position: 'absolute',
  bottom: '5px',
  left: '10px',

};
const editTitleInputStyle= {
  width: '70%'
};
const editTitleBtnStyle= {
  position: 'absolute',
  top: '5px',
  right: '15px',
  zIndex: '999'
};


//--vew options ------------------
const maxRows = 3;
const numberOfEl = 4 * maxRows;
//--------------------------------

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      titleFilter: '',
      dateFilter: '',
      editingTitle: {id: '', value: ''},
      editingBody: {id: '', value: ''}
    };
    this.pageSelect = this.pageSelect.bind(this);
    this.titleFind = this.titleFind.bind(this);
    this.dateFind = this.dateFind.bind(this);
    this.editTitleHdr = this.editTitleHdr.bind(this);
    this.sendNewTitle = this.sendNewTitle.bind(this);
    this.editBodyHdr = this.editBodyHdr.bind(this);
    this.sendNewBody = this.sendNewBody.bind(this);
  }

  pageSelect(key) {
    this.setState({page: key});
  }
  titleFind(event) {
    this.setState({titleFilter: event.target.value});
  }
  dateFind(event) {
    this.setState({dateFilter: event.target.value});
  }
  editTitleHdr(event, id) {
    const {value}= event.target; 
    this.setState({editingTitle: {id, value}});
  }
  sendNewTitle(id) {
    const {editingTitle} = this.state;
    const {didEditTitle}= this.props;
    if(id === editingTitle.id) didEditTitle(editingTitle);
    this.setState({editingTitle: {id: '', value: ''}});
  }
  editBodyHdr(event, id) {
    const {value}= event.target; 
    this.setState({editingBody: {id, value}});
  }
  sendNewBody(id) {
    const {editingBody} = this.state;
    const {didEditBody}= this.props;
    if(id === editingBody.id) didEditBody(editingBody);
    this.setState({editingBody: {id: '', value: ''}});
  }
    
  render() {

    const {page, titleFilter, dateFilter, editingTitle, editingBody} = this.state;
    const {todoList, delTodo, isEditTodo, willEditTitle, willEditBody}= this.props;

    //--filtred by Title-------------------
    let filteredList = todoList.filter((item) => {
         const {title}= item;
         if(title.indexOf(titleFilter) === 0) return true
    });
    //--filtred by Date--------------------
    filteredList = filteredList.filter((item) => {
      const {created_at}= item;
      if(!dateFilter) return true
      if(created_at === dateFilter) return true
    });
    //- pager data ------------------------
    const numberOfPages = Math.ceil(filteredList.length / numberOfEl);
    const start = (page - 1) * numberOfEl;
    const finish = start + numberOfEl;
    //---------------------------------------
    let todoPage = filteredList.map((item, i) => {
      const {id, title, description, created_at}= item;
      if(i >= start && i < finish) {
        return (
          <Col md={3} xs={3} key= {i} >
            <div style= {todoStyle}>

              {isEditTodo.title && isEditTodo.id === id ?
                <div >
                  <input 
                    type="text" 
                    value= {editingTitle.value} 
                    onChange= {(e)=> this.editTitleHdr(e, id)} 
                    style= {editTitleInputStyle} 
                    />
                  <button 
                    style= {editTitleBtnStyle} 
                    onClick= {()=> this.sendNewTitle(id)}
                    >
                    Edit
                  </button>
                </div>
                :
                <h4 onClick= {()=> willEditTitle(id)}>{title}</h4>
              }
              
              {isEditTodo.description && isEditTodo.id === id ?
                <div >
                  <textarea 
                    value= {editingBody.value} 
                    onChange= {(e)=> this.editBodyHdr(e, id)} 
                    style= {editTitleInputStyle} 
                    />
                  <button 
                    style= {editTitleBtnStyle} 
                    onClick= {()=> this.sendNewBody(id)}
                    >
                    Edit
                  </button>
                </div>

                :
                <p style= {descriptionStyle} onClick= {()=> willEditBody(id)}>{description}</p>
              }

              <p style= {createdStyle}>Added: {created_at}</p> 
              <span style= {delButtStyle} onClick= {()=> delTodo(id)}>
                X
              </span>

            </div> 
          </Col> 
        );
      }

    });


    return (
      <Row >
        <Col md={12} xs={12} >
          <Row>
            <Col md={2} xs={2}>
              <div style= {filterStyle} >
                <h4>Filter by</h4>
                <h5>Title</h5>
                <input type="text" value={titleFilter} onChange={this.titleFind} style= {inputStyle} />
                <h5>Date</h5>
                <input type="date" value={dateFilter} onChange={this.dateFind} style= {inputStyle} />

              </div>
            </Col> 

            <Col md={10} xs={10}>
              
                <Row>
                  {todoPage}
                </Row>
               
            </Col> 

          </Row>

          <Row>
            <Col md={12} xs={12}>
              <Pagination
                bsClass = 'pagination'
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={numberOfPages}
                maxButtons={3}
                activePage={page}
                onSelect={this.pageSelect}
              />
            </Col> 

          </Row>

        </Col> 
      </Row>

    );
  }
}


export default TodoList;
