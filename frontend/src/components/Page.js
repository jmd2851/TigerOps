import React from 'react';
import './Page.css';

export default function Page({children}) {
    return (
        <div className='page'>
            {children}
        </div>
    )
}