import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;

    const publishableKey = 'pk_test_51InSjkDcUfzY0ILw94YHCEg3eLW9DuMgWE2bYOQIcDmbHkJZbkTyDTUSkqeNLf2y1Sxa3ICelLnrFPVFpV6Bciph00Ba1EFFCw';

    const onToken = token => {
        console.log(token)
        alert('Payment Successful');
    }


    return (
        <StripeCheckout
            label='Pay Now'
            name='Hash Clothing Ltd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`you total is ₦
            ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            
        />
    )
}

export default StripeCheckoutButton;