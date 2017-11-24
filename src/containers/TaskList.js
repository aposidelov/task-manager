import React from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import { connect } from "react-redux";
import { push as pushRoute } from 'react-router-redux';



const TaskList = ({tasks, selectTask}) => {

    const taskForVew = tasks.map((item, i) => {
        const {
            id,
            obj_status,
            name = 'Without name',
            actual_effort = 0,
            estimated_effort = 0,
            is_high_priority = false,
            due_date = '',
            tags = []
        } = item;

        let nameStyle = {color: 'blue', cursor: 'pointer'};
        if (is_high_priority) nameStyle = {...nameStyle, color: 'red'};
        
        const tagList = tags.join(', ');

        let formatedDueDate = '',
            dueDate = '';
        if (due_date) dueDate = new Date(due_date);
        
        if (dueDate) {
            formatedDueDate = dueDate.toLocaleString("ru", {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
        }

        if (id && obj_status === 'active') {
            return (
                <tr key = {id}>
                    <td>{i}</td>
                    <td 
                        style = {nameStyle}
                        onClick = {() => selectTask(id)}
                    >
                        {name}
                    </td>
                    <td>{tagList}</td>
                    <td>{actual_effort}</td>
                    <td>{estimated_effort}</td>
                    <td>{formatedDueDate}</td>    
                </tr>
            )
        }
        return false
    });

    return (
        
        <Grid>         
            <Row>
                <Col md={2} xs={2}></Col>
                <Col md={8} xs={8}>
                    <h2>Tasks</h2>
                    <Table responsive bordered >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Name</th>
                                <th>Tags</th>
                                <th>Actual Effort</th>
                                <th>Estimated Effort</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskForVew}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Grid>  
    )
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks 
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        selectTask: id => dispatch(pushRoute(`/${id}`))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);

