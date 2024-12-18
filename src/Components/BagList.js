import React from 'react'
import { Link } from 'react-router-dom'
import Empty from './Empty'
import SkeletonLoader from './SkeletonLoader'

const BagList = ({loading,data}) => {
    return (
        <div className='bagListContainer'>
            {loading && <SkeletonLoader />}
            {(data && data.length > 0) ? 
                data.map(data =>(
                    <div className="theContent" key={data.id + parseInt(process.env.REACT_APP_CONSTANT)}>
                        <Link to={`/product/details/${data.id + parseInt(process.env.REACT_APP_CONSTANT)}`}>
                            {/* change Img */}
                            <img src={`${process.env.REACT_APP_BASE_URL === "http://127.0.0.1:8000" ? process.env.REACT_APP_BASE_URL : "" }${data.cover_image}`} alt={data.name} />
                            <div className="bagWords">
                                <div>
                                    {data.name}
                                </div>
                                <div>
                                    ${data.price.toFixed(2)}
                                </div>
                                <Link to={`/product/details/${data.id + parseInt(process.env.REACT_APP_CONSTANT)}`}>
                                    View this item
                                </Link>
                            </div>
                        </Link>
                    </div>
                ))
            :
                <div className='p-4'>
                    {!loading &&
                        <Empty msg={"Can't find an item"} />
                    }
                </div>
            }
        </div>
    )
}

export default BagList