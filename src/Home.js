import React, { useEffect } from 'react'
import BagList from './Components/BagList'
import { useDispatch, useSelector } from 'react-redux'
import { allBagsAction } from './Components/Action'

const Home = () => {
    const dispatch= useDispatch()
    const allBags = useSelector(state => state.allBags)
    const {loading,bags} = allBags

    useEffect(()=>{
        dispatch(allBagsAction(false,null))
    },[])
    return (
        <div>
            <div className='standardWidth'>
                <div className="landing">
                    <div className="header1">
                        <h1 className='font2'>
                            Best-Selling Custom Clothings & Accessories
                        </h1>
                    </div>
                    <div className="pt-3 font_14">
                        Kleopatra Vargas is a top online fashion store for Kids & adults of all gender. 
                        Shop dresses, hoodies and jewelries, and more. Affordable fashion online!
                    </div>
                </div>
            </div>
            <BagList loading={loading} data={bags} />
        </div>
    )
}

export default Home