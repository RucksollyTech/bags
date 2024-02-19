import '../Css/Stripe.css';
import React, { useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

const PaymentForms = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    
    const handleSubmit = async (e) => {
        setMessage("")
        e.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }
    
        setIsLoading(true);
    
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `https://kryspatra/success`,
          },
          receipt_email: email,
        });
    
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
    
        setIsLoading(false);
    };
    const paymentElementOptions = {
        layout: "tabs"
    }
    
    
    return (
        <div className='strip'>
            <form id="payment-form" onSubmit={handleSubmit}>
                <div className="py_1">
                    {message && <div className='text-warning'>{message}</div>}
                </div>

                <LinkAuthenticationElement
                    id="link-authentication-element"
                    onChange={(e) => setEmail(e?.target?.value)}
                />
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    )
}

export default PaymentForms