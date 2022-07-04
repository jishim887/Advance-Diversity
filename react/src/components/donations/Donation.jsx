import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, FormGroup } from 'react-bootstrap';
import './donations.css';
import PayPalDonationSimple from './PaypalDonationSimple';
import { getCurrentUser } from '../../services/donationsService';
import debug from 'sabio-debug';

const _logger = debug.extend('Donation');

const Donation = () => {
    const [donation, setDonation] = useState(0);
    const [isOther, setIsOther] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        isAnonymous: false,
    });
    const [isUser, setIsUser] = useState(false);
    _logger(donation, isOther);

    useEffect(() => {
        getCurrentUser().then(onGetUserSuccess).catch(onGetUserError);
    }, []);

    const onGetUserSuccess = (response) => {
        const userInfo = response.item;
        setCurrentUser((prevState) => {
            return { ...prevState, ...userInfo };
        });
        if (userInfo.id) {
            setIsUser(true);
        }
    };

    const onGetUserError = (response) => {
        _logger(response);
    };

    const onValueChange = (e) => {
        _logger(e.target.value);
        const amount = Number(e.target.value);
        setDonation(amount);
        setIsOther(false);
    };
    const onOtherClick = () => {
        setIsOther(true);
        setDonation(0);
    };
    const onOtherChange = (e) => {
        setDonation(Number(e.target.value));
    };

    const onFieldChange = (e) => {
        const target = e.target;
        const value = target.value;
        const fieldName = target.name;
        setCurrentUser((prevState) => {
            const newField = { ...prevState };
            newField[fieldName] = value;
            return newField;
        });
    };
    const onAnonCheck = (e) => {
        _logger(e.target);
        setCurrentUser((prevState) => {
            const checkField = { ...prevState };
            checkField.isAnonymous = e.target.checked;
            return checkField;
        });
    };
    return (
        <Container>
            <Row className="d-flex justify-content-center mt-3">
                <Col>
                    <Card className="donate-card">
                        <div className="text-center">
                            <h3>Appreciate what we have to offer? Consider donating.</h3>
                            <p className="mt-2">
                                We are a non-profit organization dedicated to helping our growing community. Your
                                donation can help improve our services.
                            </p>
                        </div>
                    </Card>
                    <Card className="donate-card">
                        <div className="text-center">
                            <Form>
                                {isUser ? (
                                    <h3>Thank you for your generous contribution, {currentUser.firstName}</h3>
                                ) : (
                                    <div>
                                        <h3>Let us know who you are</h3>
                                        <Link to="../login">
                                            <div className="m-2">Please login here if you have an account.</div>
                                        </Link>
                                        <FormGroup className="d-flex mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                placeholder="First Name"
                                                onChange={onFieldChange}
                                            />
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                placeholder="Last Name"
                                                onChange={onFieldChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="companyName"
                                                placeholder="Company Name"
                                                onChange={onFieldChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                placeholder="Email"
                                                onChange={onFieldChange}
                                            />
                                        </FormGroup>
                                    </div>
                                )}
                                <FormGroup>
                                    <input type="checkbox" style={{ marginRight: '5px' }} onChange={onAnonCheck} />
                                    <label>I would like to stay anonymous</label>
                                </FormGroup>
                            </Form>
                        </div>
                    </Card>
                    <Card className="donate-card">
                        <div className="text-center donate-buttons">
                            <h3>Select Donation Amount</h3>
                            <button className="btn btn-warning" value="5" onClick={onValueChange}>
                                $5
                            </button>
                            <button className="btn btn-warning" value="10" onClick={onValueChange}>
                                $10
                            </button>
                            <button className="btn btn-warning" value="20" onClick={onValueChange}>
                                $20
                            </button>
                            <button className="btn btn-warning" onClick={onOtherClick}>
                                Other
                            </button>
                            {isOther && (
                                <Form className="other-field">
                                    <Form.Control
                                        name="donation"
                                        type="number"
                                        min="1"
                                        step="any"
                                        placeholder="Enter the amount to donate"
                                        onChange={onOtherChange}
                                    />
                                </Form>
                            )}
                        </div>
                    </Card>
                    <Card className="donate-card">
                        <div className="text-center">
                            <h3>Complete your transaction here:</h3>
                            {donation > 0 ? (
                                <PayPalDonationSimple cost={donation} user={currentUser} />
                            ) : (
                                'Please select the donation amount in order to pay.'
                            )}
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center"></div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Donation;
