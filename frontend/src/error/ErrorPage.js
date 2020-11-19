import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const ErrorPage = () => {

    return (
        <Container fluid className="h-100 d-flex justify-content-center align-items-center">
            <Row className="mt-5">
                <Col>
                    <h1>Error</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default ErrorPage;