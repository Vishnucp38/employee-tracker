import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Switch, useRouteMatch, NavLink, useHistory } from 'react-router-dom';
import PrivateRoute from '../common/components/privateRoute';
import Employee from '../common/utils/Employee';
import Task from '../task/Task';
import TaskHistory from '../taskhistory/TaskHistory';

const Home = () => {
    const { path, url } = useRouteMatch();
    const history=useHistory();

    const signOut= () =>{
        window.localStorage.clear();
        history.replace('/');
    }

    return (
        <Container>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">{`Employee (${Employee.getName()})`}</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink className="nav-link" to={`${url}/task`}>Task</NavLink>
                    <NavLink className="nav-link " to={`${url}/history`}>History</NavLink>
                </Nav>
                <Form inline>
                    <Button variant="outline-primary" onClick={signOut}>Sign Out</Button>
                </Form>
            </Navbar>
            <Switch>
                <PrivateRoute path= {`${path}/task`} component={Task}/>
                <PrivateRoute path= {`${path}/history`} component={TaskHistory}/>
            </Switch>
        </Container>
    )
}

export default Home;