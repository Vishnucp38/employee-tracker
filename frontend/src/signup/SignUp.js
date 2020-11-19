import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { properties } from '../common/property';
import Employee from '../common/utils/Employee';

const SignUp = () => {
    const { register, errors, handleSubmit } = useForm({ mode: 'onSubmit' });
    const history = useHistory();

    const signUp = (data) => {
        const loginData = {
            email: data.email,
            password: data.password
        }
        fetch(`${properties.base_url}/emp/createEmployee`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).then(data => data.json())
            .then((response) => {
                fetch(`${properties.base_url}/emp/login`, {
                    method: 'POST',
                    body: JSON.stringify(loginData),
                    headers: { 'content-type': 'application/json' }
                })
                    .then(data => data.json())
                    .then((response) => {
                        if (response.message === "Unauthenticated") {
                            console.log(response);
                        } else {
                            Employee.setName(response.emp.name)
                            Employee.setEmployeeId(response.emp._id)
                            Employee.setToken(response.token);
                            history.replace('/home/task');
                        }
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    };

    const isNewEmail = async (email) => await new Promise((resolve) => {
        fetch(`${properties.base_url}/emp/findEmployeeByEmail/${email}`)
            .then(data => data.json())
            .then((response) => {
                resolve(!response.emp)
            })
            .catch((err) => {
                resolve(false)
            });
    });

    return (
        <Container fluid className="h-100 d-flex justify-content-center align-items-center">
            <div className="" style={{ width: '350px', padding: '30px' }}>
                <Row>
                    <Col>
                        <h2>Sign Up</h2>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit(signUp)} noValidate>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            isInvalid={errors.name}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{getErrorMessage("name", errors)}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            isInvalid={errors.email}
                            ref={register({
                                required: true,
                                validate: isNewEmail,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{getErrorMessage("email", errors)}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone No</Form.Label>
                        <Form.Control
                            type="number"
                            name="phone"
                            placeholder="Enter phone no"
                            isInvalid={errors.phone}
                            ref={register({
                                required: true,
                                maxLength: 10,
                                minLength: 10
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{getErrorMessage("phone", errors)}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Designation</Form.Label>
                        <Form.Control
                            type="text"
                            name="designation"
                            placeholder="Enter designation"
                            isInvalid={errors.designation}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{getErrorMessage("designation", errors)}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            isInvalid={errors.password}
                            ref={register({
                                required: true,
                                minLength: 8,
                                maxLength: 20,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{getErrorMessage("password", errors)}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="cpassword"
                            placeholder="Enter password"
                            isInvalid={errors.cpassword}
                            ref={register({
                                required: true,
                                validate: (cpassword) => document.getElementsByName("password")[0].value === cpassword,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{getErrorMessage("cpassword", errors)}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Sign Up
                    </Button>
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-center align-items-center">
                            <Link to={'/'}> Log In </Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}

const getErrorMessage = (elementName, errors) => {
    let msg = '';
    switch (elementName) {
        case 'name':
            if (errors.name) {
                if (errors.name.type === 'required') {
                    msg = 'Please provide a valid name';
                } else if (errors.name.type === 'maxLength') {
                    msg = 'Maximum length exceeded';
                }
            }
            break;
        case 'email':
            if (errors.email) {
                if (errors.email.type === 'required') {
                    msg = 'Please provide a valid email';
                } else if (errors.email.type === 'pattern') {
                    msg = 'Please provide a valid email';
                }else if (errors.email.type === 'validate') {
                    msg = 'Email address is already registered';
                }
            }
            break;
        case 'phone':
            if (errors.phone) {
                if (errors.phone.type === 'required') {
                    msg = 'Please provide a valid phone number';
                } else if (errors.phone.type === 'maxLength') {
                    msg = 'Maximum length exceeded';
                } else if (errors.phone.type === 'minLength') {
                    msg = 'Minimum 10 numbers required';
                }
            }
            break;
        case 'designation':
            if (errors.designation) {
                if (errors.designation.type === 'required') {
                    msg = 'Please provide a valid designation';
                } else if (errors.designation.type === 'maxLength') {
                    msg = 'Maximum length exceeded';
                }
            }
            break;
        case 'password':
            if (errors.password) {
                if (errors.password.type === 'required') {
                    msg = 'Please provide a valid password';
                } else if (errors.password.type === 'maxLength') {
                    msg = 'Maximum length exceeded';
                } else if (errors.password.type === 'minLength') {
                    msg = 'Minumum 8 characters required';
                }
            }
            break;
        case 'cpassword':
            if (errors.cpassword) {
                if (errors.cpassword.type === 'required') {
                    msg = 'Please confirm password';
                } else if (errors.cpassword.type === 'validate') {
                    msg = 'Wrong password';
                }
            }
            break;
        default: break;
    }

    return msg;
};


export default SignUp;