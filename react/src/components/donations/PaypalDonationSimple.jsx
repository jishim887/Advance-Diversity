import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { DonationPropTypes } from './DonationPropTypes';
import getSymbolFromCurrency from 'currency-symbol-map';
import { addPayment } from '../../services/donationsService';

import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

import debug from 'sabio-debug';

const _logger = debug.extend('PayPal');

const PayPalDonationSimple = (props) => {
    const navigate = useNavigate();
    const [paypalState, setPaypalState] = useState({
        env: 'sandbox',
        currency: 'USD',
        total: 0,
        client: {
            sandbox: 'AcXFz-X5993ZufGZEv0AEMPMbeden-BMr9oUzNXOOpFFVWxDWFk48dYzZhfbUvm1bd48j-w6gwieIMKn',
        },
    });

    useEffect(() => {
        setPaypalState((prevState) => {
            const newCost = { ...prevState };
            newCost.total = props.cost;
            return newCost;
        });
        _logger('switching amount');
    }, [props.cost]);

    const onSuccess = (payment) => {
        _logger('transaction sucessful:', payment);

        const paymentCopy = { ...payment };
        const addressCopy = { ...payment.address };
        const userCopy = { ...props.user };

        let payload = {};
        payload.userId = userCopy.id;
        payload.email = userCopy.email;
        payload.firstName = userCopy.firstName;
        payload.lastName = userCopy.lastName;
        payload.companyName = userCopy.companyName;
        payload.isAnonymous = userCopy.isAnonymous;
        payload.amount = paypalState.total;
        payload.currency = paypalState.currency;
        payload.city = addressCopy.city;
        payload.state = addressCopy.state;
        payload.country = addressCopy.country_code;
        payload.payerId = paymentCopy.payerID;
        payload.paymentId = paymentCopy.paymentID;
        payload.paymentToken = paymentCopy.paymentToken;
        payload.returnUrl = paymentCopy.returnUrl;

        let paypalObj = { ...payment };
        paypalObj.amount = paypalState.total;
        paypalObj.currency = paypalState.currency;
        paypalObj.currencySymbol = getSymbolFromCurrency(paypalState.currency);
        paypalObj.address = { ...payment.address };
        paypalObj.address.countryCode = paypalObj.address.country_code;
        paypalObj.address.postalCode = paypalObj.address.postal_code;
        paypalObj.address.recipientName = paypalObj.address.recipient_name;
        paypalObj.user = { ...props.user };

        const stateForTransport = { type: 'Donation_Confirmed', payload: paypalObj };
        addPayment(payload).then(onAddPaymentSuccess).catch(onAddPaymentError);

        function onAddPaymentSuccess(response) {
            _logger(response);
            toastr['success'](`Payment successful`, 'Success');
            setTimeout(function () {
                navigate('./confirmation', { state: stateForTransport });
            }, 1000);
        }
        function onAddPaymentError(response) {
            _logger(response);
            setTimeout(function () {
                navigate('./confirmation', { state: stateForTransport });
            }, 1000);
        }
    };

    const onCancel = (data) => {
        _logger('payment canceled:', data);
        toastr['error'](`Payment canceled`, 'Error');
    };
    const onError = (err) => {
        _logger('transaction error:', err);
        toastr['error'](`Payment error`, 'Error');
    };
    return (
        <div className="paypal-btn" style={{ margin: '1.5rem', textAlign: 'center' }}>
            <PaypalExpressBtn
                env={paypalState.env}
                client={paypalState.client}
                currency={paypalState.currency}
                total={paypalState.total}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                style={{ shape: 'rect', size: 'medium', margin: '1.5rem' }}
            />
        </div>
    );
};
PayPalDonationSimple.propTypes = DonationPropTypes;
export default PayPalDonationSimple;
