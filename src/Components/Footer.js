import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const date = new Date().getFullYear()
    const [newsLetter, setNewsLetter] = useState(false)
    const [newsLetterForm, setNewsLetterForm] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async(e) => {
        e.preventDefault()
        setSuccess(false);
        setLoading(true);
        try {
            const {data} = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/newsletter`,
                {email:newsLetterForm}
            );
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            setLoading(false);
            setSuccess(false);
        }
    }
    return (
        <div>
            <div className="Foot">
                <div className='standardWidth '>
                    <div className="Footer">
                        <div>
                            <h1>
                                HELP
                            </h1>
                            <div className="footerBody">
                                Our Client Advisors are available to 
                                assist you by phone at <a className='anchor' href="tel:+17086633189">+1 (708) 663-3189</a>
                                . You can also <a className='anchor' href="mailto:kleopatravargas@gmail.com">email us</a>.
                            </div>
                        </div>
                        <div>
                            <h1>
                                LINKS
                            </h1>
                            <div className="footerBody">
                                
                                <div className='pb-2'>
                                    <Link to={"/items/list"}>
                                        All items
                                    </Link>
                                </div>
                                <div className='pb-2'>
                                    <Link to={"/wish/list"}>
                                        Wish List
                                    </Link>
                                </div>
                                <div className='pb-2'>
                                    <Link to={"/products/cart"}>
                                        Cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1>
                                EMAIL SIGN-UP
                            </h1>
                            <div className="footerBody">
                                <span onClick={()=>setNewsLetter(!newsLetter)} className='anchor pointer'>Sign up</span> for Kleopatra Vargas emails and 
                                receive the latest news on exclusive online pre-launches 
                                and new collections.
                            </div>
                            <div className={`relative newLetterContainer ${newsLetter && "display"}`}>
                                <form onSubmit={handleSubmit}>
                                    {success ? 
                                        <div className="text-success bold7">Success!</div> 
                                    : 
                                        <div className='newLetter'>
                                            <div className="pb-1">
                                                <img className='pointer' onClick={()=>setNewsLetter(!newsLetter)} width="20" height="20" src="https://img.icons8.com/ios/20/collapse-arrow--v2.png" alt="collapse-arrow--v2"/>
                                            </div>
                                            <div className='form-group'>
                                                <input 
                                                value={newsLetterForm}
                                                onChange={(e)=>setNewsLetterForm(e.target.value)}
                                                type="email" required placeholder='Enter email address' className='form-control' />
                                            </div>
                                            <div className="mt-2">
                                                <button className='productButton' disabled={loading}>
                                                    {loading ? "Loading..." : "Submit"}
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Copyright">
                <div className="standardWidth">
                    © Copyright {date} kleopatra Vargas. All Rights Reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer