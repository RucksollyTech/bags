import React, { useEffect } from 'react'
import BagList from './Components/BagList'
import { useDispatch, useSelector } from 'react-redux'
import { allBagsAction } from './Components/Action'
import Loader from './Components/Loader'

const AllBags = () => {
    const dispatch= useDispatch()
    const allBags = useSelector(state => state.allBags)
    const {loading,bags} = allBags

    useEffect(()=>{
        dispatch(allBagsAction(false))
    },[])
    return  <BagList loading={loading} data={bags} />
    
}

export default AllBags