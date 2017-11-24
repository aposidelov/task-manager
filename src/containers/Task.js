import React from 'react';
import { connect } from 'react-redux';

import { push as pushRoute } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

import { Grid, Row, Col, Panel } from 'react-bootstrap';
import ArrowLeft from 'react-icons/lib/fa/arrow-left';

import action from '../actions/main';
import { sendToServer } from '../actions/async';
import { filter } from '../utils';

   

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {titleVal: ''};

        const {match: {params: {taskId}}, selectTask, getTask} = props;
        selectTask(taskId);
        this.task = getTask(taskId);
        
        this.changeTitle = this.changeTitle.bind(this);
        this.submitHdr = this.submitHdr.bind(this);
        this.startEdit = this.startEdit.bind(this);
    }

    startEdit (id) {
        const {edit} = this.props;
        this.setState({titleVal: ''});
        edit.start(id);
    }
   
    changeTitle ({target: {value}}) {
        this.setState({titleVal: value});
    }

    submitHdr () {
        const {titleVal} = this.state;
        const {edit} = this.props;
        if (titleVal) edit.submit({...this.task, name: titleVal});
    }

    componentWillReceiveProps (nextProps) {
        const {match: {params: {taskId}}, editState, getTask} = nextProps;
        if (editState === 'success') this.task = getTask(taskId);
    }
    
    render() {

        const {titleVal} = this.state;
        const {match: {params: {taskId}}, goHome, editState} = this.props;
        const {name, description} = this.task;
               
        let nameFild = '',
            button = '';

        switch (editState) {

            case 'willEdit':
                nameFild = (
                    <input 
                        type="text" 
                        value= {titleVal}
                        onChange= {e => this.changeTitle(e)} 
                        style= {{width: '70%'}} 
                    />
                );
                button = (
                    <button 
                        onClick= {() => this.submitHdr()}
                        style= {{float: 'right'}} 
                    >
                        Edit
                    </button>
                );
            break;

            case 'sending':
                nameFild = (<h4>{'...sending'}</h4>);
                button = '';
            break;
          
            default:
                nameFild = (<h4 onClick = {() =>  this.startEdit(taskId)}>{name}</h4>);
                button = '';
        }    

        const headerContent = (<div>{nameFild}{button}</div>);

        return (

            <Grid>
                <h3 onClick = {goHome}><ArrowLeft /></h3>
                <Row>
                    <Col md={2} xs={2}></Col>
                    <Col md={8} xs={8}>
                        <Panel header = {headerContent}>
                            {description}
                        </Panel>    
                    </Col>
                </Row>
            </Grid>

        )
    }
}

const mapStateToProps = (state) => {
    const {tasks, taskHandling: {editState}} = state;
    return {
        getTask: id => filter(tasks, id),
        editState
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectTask: id => dispatch(action.selectTask(id)),
        goHome: () => {
            dispatch(pushRoute('/'));
            dispatch(action.endEdit())
        },
        edit: {
            start: taskId => dispatch(action.willEditName(taskId)),
            submit: task => dispatch(sendToServer(task))
        }
    }
};


const TaskWithRouter = withRouter( props => <Task {...props}/> );
export default connect(mapStateToProps, mapDispatchToProps)(TaskWithRouter);