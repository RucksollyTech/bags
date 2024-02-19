import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Components/Loader';
import PaymentForms from './Components/PaymentForms';
import { checkoutAction } from './Components/Action';


const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PUBLIC_KEY);

const StripeCheckout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {type} = useParams();
    const dispatch = useDispatch()
    const checkout = useSelector(state => state.checkout)
    const {loading,error,result} = checkout

    const [cart,setCart] = useState(JSON.parse(localStorage.getItem(`checkOutUserInfo`)))

    useEffect(()=>{
        if(cart && cart.length === 0) {
            return <div className='container strip text-center font_24 text-danger'>Error : Your cart is empty. </div>
        }else{
            if(cart && type === "cart"){
                dispatch(checkoutAction(cart))
            }
        }
    },[])

    useEffect(()=>{
        setClientSecret(result ? result.clientSecret : "")
    },[result])

    const options={
        clientSecret:clientSecret
    }
    return (
        <div className='container strip'>
            {loading && <Loader />}
            {error && <div className='text-danger'>Something went wrong. Please try again later.</div>}
            {clientSecret && stripePromise &&
                (<Elements stripe={stripePromise} options={options}>
                    <PaymentForms />
                </Elements>)
            }
        </div>
    )
}

export default StripeCheckout