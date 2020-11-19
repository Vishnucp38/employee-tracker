import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { properties } from '../common/property';
import Employee from '../common/utils/Employee';

const Task = () => {
    const { register, errors, handleSubmit } = useForm({ mode: 'onSubmit' });
    const history = useHistory();

    const addTask = (data) => {
        data['employeeId']=Employee.getEmployeeId();
        fetch(`${properties.base_url}/emp/createTask`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'content-type': 'application/json',
                'Authorization': `Bearer ${Employee.getToken()}`
            }
        }).then(data => data.json())
            .then((response) => {
                history.replace('/home/history');
            })
            .catch(console.log);
    };

    return (
        <Container>
            <Container className="p-5" fluid>
                <h1>Task</h1>
                <Form onSubmit={handleSubmit(addTask)} noValidate>
                    <Form.Group>
                        <Form.Label>Working Project</Form.Label>
                        <Form.Control
                            type="text"
                            name="project"
                            placeholder="Enter working project"
                            isInvalid={errors.project}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid project</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="task"
                            placeholder="Enter Task Title"
                            isInvalid={errors.task}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid task</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            isInvalid={errors.description}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid description</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                            type="text"
                            name="comments"
                            placeholder="Enter comments"
                            isInvalid={errors.comments}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid comment</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            custom
                            as="select"
                            type="text"
                            name="status"
                            isInvalid={errors.status}
                            defaultValue={""}
                            ref={register({
                                required: true
                            })}
                        >
                            <option value="">--select--</option>
                            <option value="pending">Pending</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Please select a status</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date And Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="date"
                            placeholder="Enter date and time"
                            isInvalid={errors.date}
                            ref={register({
                                required: true
                            })}
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid date and time</Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-center align-items-center">
                            <Button variant="primary" type="submit">
                                Add Task
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    )
}


export default Task;