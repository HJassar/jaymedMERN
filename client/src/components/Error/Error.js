import React from 'react';

import './Error.css'

const Error = ({ errorMessage }) => {
    return (
        <div
            className='Error'
        >
            <h2>
                {errorMessage}
            </h2>
        </div>
    )
}

export default Error;