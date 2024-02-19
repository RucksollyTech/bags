import React, { useEffect, useState } from 'react'
import {
    useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from 'react-redux';
import { cartAddAction, checkoutAction } from './Action';
import Loader from './Loader';

const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PUBLIC_KEY);


const SucessComponent = ({clientSecret}) => {
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const [succes, setSuccess] = useState(false);
    const dispatch = useDispatch()
    const checkout = useSelector(state => state.checkout)
    const {loading,error,result} = checkout

    useEffect(() => {
        setMessage(null)
        setSuccess(false)
        if (!stripe) {
          return;
        }
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setSuccess(true)
                    setMessage("Payment Successful");
                    dispatch(checkoutAction({
                        type: "track",
                        secrete : clientSecret
                    }))
                    
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);
    useEffect(()=>{
        if (result){
            localStorage.setItem(`cartItems`, JSON.stringify(""))
            dispatch(cartAddAction())
        }
    },[result])
    return (
        <>
            {error && <div className='text-danger'>Something went wrong. Please try again later</div>}
            {loading && <Loader />}
            {result && 
                <>
                    {succes ?
                        
                        <div className='strip'>
                            <div className='relative'>
                                {/* put gif here */}
                                <img src="/Images/success.gif" alt="success" />
                                <span className='text-success bold7 payMentSuccess font_24'>
                                    Payment Success
                                </span>
                            </div>
                        </div>
                    :
                        <div className='strip'>
                            <div className='relative'>
                                <span>
                                    {message && <div className='text-warning'>{message}</div>}
                                </span>
                            </div>
                        </div>
                    }
                </>
            }
            
        </>
    )
}

export default SucessComponent