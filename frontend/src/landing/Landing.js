import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { properties } from '../common/property';
import Employee from '../common/utils/Employee';


const Landing = () => {
    const { register, errors, handleSubmit } = useForm({ mode: 'onSubmit' });
    const [authError, setAuthError] = useState();
    const history = useHistory();

    const logIn = (data) => {
        fetch(`${properties.base_url}/emp/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
            .then(data => data.json())
            .then((response) => {
                if (response.message === "Unauthenticated") {
                    setAuthError("Unauthenticated");
                } else {
                    Employee.setName(response.emp.name)
                    Employee.setEmployeeId(response.emp._id)
                    Employee.setToken(response.token);
                    history.replace('/home/task');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container fluid className="h-100 d-flex justify-content-center align-items-center">
            <div className="" style={{ width: '350px', padding: '30px' }}>
                <Row>
                    <Col>
                        <h2>Log In</h2>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit(logIn)} noValidate>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            isInvalid={errors.email || errors.password || authError}
                            ref={register({
                                required: true,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            isInvalid={errors.email || errors.password || authError}
                            ref={register({
                                required: true
                            })}
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid email / password</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        login
                </Button>
                </Form>
                <Row className="mt-3">
                    <Col className="d-flex justify-content-center align-items-center">
                        <Link to={'/signup'}> Sign Up </Link>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Landing;