import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import './Breadcrumbs.css'


const Breadcrumbs = ({ breadcrumbs }) => {

    console.log(breadcrumbs)

    const Chain = () => {
        return breadcrumbs.map((breadcrumb, index, array) => {
            return (
                <>
                    {(index < array.length - 1) ?
                    <><a href='#'>{breadcrumb}</a> &gt;</>
                    : 
                    <strong>{breadcrumb}</strong>
                    }
                </>
            )
        })

    }

    return (
        <div className='Breadcrumbs'>
            <Link
                className='Breadcrumbs__link'
                to='/'><FontAwesomeIcon icon={faHome} /></Link> &gt;&nbsp;
            <Chain />
        </div>
    )
}

export default Breadcrumbs;