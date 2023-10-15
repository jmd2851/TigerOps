import React from 'react';
import './Page.css';
import Navigation from "./navigation.js";

export default function Page({children}) {
    return (
        <div className='page'>
            <div className='navBar'>
               <Navigation/>
            </div>

            <div className='content'>
                {children}
            </div>
        </div>
    )
}