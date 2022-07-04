import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import debug from 'sabio-debug';
import './donations.css';
import AdvDiversity from '../../assets/images/users/logo-transparent.png';
import { emailReceipt } from '../../services/donationsService';

const _logger = debug.extend('DonationConfirm');

const DonationConfirm = () => {
    const { state } = useLocation();
    const [transaction, setTransaction] = useState({
        address: {
            city: '',
            countryCode: '',
            line1: '',
            postalCode: '',
            recipientName: '',
            state: '',
        },
        cancelled: false,
        email: '',
        paid: true,
        payerID: '',
        paymentID: '',
        paymentToken: '',
        returnUrl: '',
        amount: 0,
        currency: '',
        currencySymbol: '',
        user: {
            id: 0,
            email: '',
            firstName: '',
            lastName: '',
            companyName: '',
            isAnonymous: false,
        },
    });

    useEffect(() => {
        if (state?.type === 'Donation_Confirmed' && state.payload) {
            setTransaction((prevState) => {
                const newTransaction = { ...prevState, ...state.payload };
                newTransaction.address = { ...state.payload.address };
                _logger(transaction);
                return newTransaction;
            });
            if (state.payload.email) {
                const info = state.payload;
                let emailInfo = {
                    firstName: info.user.firstName ? info.user.firstName : 'Anonymous',
                    email: info.user.email,
                    currency: info.currency,
                    amount: info.amount,
                    paymentId: info.paymentID,
                };
                emailReceipt(emailInfo).then(onEmailSuccess).catch(onEmailError);
            }
        }
    }, []);
    const onEmailSuccess = (response) => {
        _logger('email sent', response);
    };
    const onEmailError = (response) => {
        _logger(response);
    };
    return (
        <Container className="text-center">
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5} xxl={4}>
                    <Card className="donation-confirm-card">
                        <Card.Header className="pt-1 pb-1 text-center d-flex justify-content-center align-items-center confirm-header">
                            <Link to="/">
                                <span>
                                    <img src={AdvDiversity} alt="" height="150px" />
                                </span>
                            </Link>
                        </Card.Header>

                        <Card.Body className="p-4">
                            <div className="text-center">
                                <h1 className="mt-1">Order Confirmation</h1>
                                <h4 className="mt-2">
                                    Thank you for your donation of{' '}
                                    <span>
                                        {transaction.currencySymbol && transaction.currencySymbol}
                                        {transaction.amount}
                                        {!transaction.currencySymbol && transaction.currency}
                                    </span>
                                    <span>{transaction.user.firstName && `, ${transaction.user.firstName}`}</span>!
                                </h4>
                                <div>
                                    The receipt has been sent to your email: <div>{transaction.user.email}</div>
                                </div>
                                <div className="mt-2">
                                    Transaction Id:
                                    <div>{transaction.paymentID}</div>
                                </div>

                                <Link className="btn btn-secondary mt-2" to="../">
                                    Return Home
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default DonationConfirm;
