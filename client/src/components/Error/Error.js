import React from 'react';

import './Error.css'

const Error = ({ errorResponse }) => {
    return (
        <div
            className='Error'
        >
            <h2>
                {errorResponse.statusText}
            </h2>
        </div>
    )
}

export default Error;