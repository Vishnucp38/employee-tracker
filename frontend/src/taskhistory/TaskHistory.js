import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { properties } from '../common/property';
import Employee from '../common/utils/Employee';
import List from './List';

const TaskHistory = () => {
    const [tasks, setTasks] = useState();
    const [dateFilter, setDateFilter] = useState();

    const filterHandler = (evt) => {
        setDateFilter(new Date(evt.currentTarget.value));
    }

    const clearFilter = () => {
        document.getElementById('fdate').value="";
        setDateFilter(undefined);
    }

    useEffect(() => {
        const data = {
            employeeId: Employee.getEmployeeId(),
            date: dateFilter
        };

        fetch(`${properties.base_url}/emp/findTasksByFilter`, {
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'content-type':'application/json',
                'Authorization': `Bearer ${Employee.getToken()}`
            }
        })
            .then(data => data.json())
            .then(setTasks)
            .catch(console.log)
    }, [dateFilter]);

    return (
        <Container>
            <Container className="p-5">
                <h1>History</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Date Filter</Form.Label>
                        <Form.Control
                            id="fdate"
                            type="date"
                            name="date"
                            placeholder="Select date"
                            onChange={filterHandler}
                        />
                    </Form.Group>
                    <Button type="button" onClick={clearFilter}> Clear Filter</Button>
                </Form>
                <div className="mt-3">    
                    <List tasks={tasks} />
                </div>
            </Container>
        </Container>
    );
};

export default TaskHistory;