import React from 'react'
import Skeleton from 'react-loading-skeleton'


const SkeletonLoader = () => {
    return (
        <div className='theContent' style={{
            minHeight: "400px"
        }}>
            <Skeleton className='skels' />
            <div className="bagWords">
                <Skeleton height={10} />
                <Skeleton height={10} />
                <Skeleton height={10} />
            </div>
        </div>
    )
}

export default SkeletonLoader