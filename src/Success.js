import React, { useEffect, useState } from 'react'
import {
    Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SucessComponent from './Components/SucessComponent';
import Loader from './Components/Loader';

const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PUBLIC_KEY);

const Success = () => {
    const [clientSecret, setClientSecret] = useState("");

    const clientSecre = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );
    
    useEffect(()=>{
        if(clientSecre){
            setClientSecret(clientSecre)
        }
    },[clientSecre])

    const options={
        clientSecret:clientSecret
    }
    return (
        <div>
            <div className='container strip_bg'>
                {!clientSecret && <Loader/>}
                {clientSecret && stripePromise &&
                    (<Elements stripe={stripePromise} options={options}>
                        <SucessComponent clientSecret = {clientSecret} />
                    </Elements>)
                }
                
            </div>
        </div>
    )
}

export default Success