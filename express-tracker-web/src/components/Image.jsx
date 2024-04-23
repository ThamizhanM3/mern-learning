import React from 'react'

const Image = ({ source, size = 200 }) => {
    return (
        <div className='Image'>
            <img src={source} style={{ height: `${size}px`, width: `${size}px` }} alt="" />
        </div>
    )
}

export default Image
