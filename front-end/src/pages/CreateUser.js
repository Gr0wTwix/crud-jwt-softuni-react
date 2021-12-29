import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './styles/createUser.css';

export default class CreateUser extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        alert: false,
        alertMessage: '',
        alertVariant: '',
    };

    handleInputChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ alert: false });
        const { name, email, password, dateOfBirth } = this.state;

        if (!name.length || !email.length || !password.length || !dateOfBirth.length) return;

        const responseUser = await api.post('/users', { name, email, password, dateOfBirth });

        if (responseUser.data.success) {
            this.setState({
                alertVariant: 'success',
            });
        } else {
            this.setState({
                alertVariant: 'danger',
            });
        }
        this.setState({
            alert: true,
            alertMessage: responseUser.data.message
        });
    };


    render() {
        return (
            <Container className="vertical-align">
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={{ span: 4, offset: 4 }}>
                            <h1 className="d-flex justify-content-center">REGISTER</h1>
                            {
                                this.state.alert &&
                                <Alert variant={this.state.alertVariant} dismissible>
                                    {this.state.alertMessage}
                                </Alert>
                            }
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="name" type="text" placeholder="Name*" />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="email" type="email" placeholder="Email*" />
                            </Form.Group>
                            <Form.Group controlId="dateOfBirth">
                                <Form.Label>Data of birth</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="dateOfBirth" type="date" placeholder="Data of birth" />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="password" type="password" placeholder="Password*" />
                            </Form.Group>
                            <Button variant="btn btn-outline-dark" block type="submit">
                                Register
                            </Button>
                            <Link className="btn btn-outline-dark fullWidthWithSpace" to="/" >
                                Login
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}
