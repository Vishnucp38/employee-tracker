import React from 'react';
import { Table } from 'react-bootstrap';

const List = ({tasks}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Comments</th>
                    <th>Status</th>
                    <th>Date and Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks && tasks.length>0 ?
                    tasks.map((task,index)=>{
                        return <Item {...task} key={index}/>
                    }): <></>
                }
            </tbody>
        </Table>
    );
};

const Item = ({project, task, description, comments, status, date}) => {
    return (
        <tr>
            <td>{project}</td>
            <td>{task}</td>
            <td>{description}</td>
            <td>{comments}</td>
            <td>{status}</td>
            <td>{new Date(date).toLocaleString()}</td>
        </tr>
    )
};

export default List;