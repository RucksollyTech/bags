import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { useState } from 'react'
import { useEffect } from 'react'
import Empty from './Empty'

const BagList = ({loading,data}) => {
    return (
        <div className='bagListContainer'>
            {loading && <Loader />}
            {(data && data.length > 0) ? 
                data.map(data =>(
                    <div className="theContent" key={data.id + parseInt(process.env.REACT_APP_CONSTANT)}>
                        <Link to={`/product/details/${data.id + parseInt(process.env.REACT_APP_CONSTANT)}`}>
                            {/* change Img */}
                            <img src={`${process.env.REACT_APP_BASE_URL}${data.cover_image}`} alt={data.name} />
                            <div className="bagWords">
                                <div>
                                    {data.name}
                                </div>
                                <div>
                                    ${data.price.toFixed(2)}
                                </div>
                                <Link to={`/product/details/${data.id + parseInt(process.env.REACT_APP_CONSTANT)}`}>
                                    View this bag
                                </Link>
                            </div>
                        </Link>
                    </div>
                ))
            :
                <div className='p-4'>
                    <Empty msg={"Can't find a bag"} />
                </div>
            }
        </div>
    )
}

export default BagList