import React, { useEffect, useState } from 'react'
import Loader from './Components/Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Unsubscribe = () => {
    const {email} = useParams()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(async()=>{
        setSuccess(false);
        try {
            const {data} = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/unsubscribe`,
                {email}
            );
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            setLoading(false);
            setSuccess(false);
        }
    },[email])
    return (
        <div>
            <div className="pt-5">
                {loading && <Loader />}
            </div>
            {success && 
                <div className='container'>
                    <div className='relative twoEquo'>
                        <span className='text-success bold7 payMentSuccess font_24'>
                            Your request to unsubscribe for newsletter was successful.
                        </span>
                        <img src="/Images/success.gif" alt="success" />
                    </div>
                </div>
            }
            {!loading && !success && <div className="alert alert-danger">An error occurred. Please try again later </div>}
        </div>

    )
}

export default Unsubscribe