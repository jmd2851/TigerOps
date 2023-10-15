import React from 'react';
import './Navigation.css';
import { Outlet, Link } from "react-router-dom";

export default function Navigation (){
    return(
            <div className='navContainer'>
            <div className = "nav">
            <h1 className = "User">
                Admin
            </h1>
            <div className='calendarOptions'>
                <div className='topOptions'>
                    <h2 className='links'>
                        <Link to="/events">Events </Link>
                    </h2>
                </div>
                <div className='topOptions'>
                    <h2 className = "links">
                    <Link to="/events"> Calendar View </Link>
                    </h2>
                </div>
            </div>
            <div className='border'>
                
            </div>
                <div className='bottomOptions'>
                    <h2 className='links'>
                    <Link to="/events"> Configuration </Link>
                    </h2>
                </div>
                    <h2 className='links'>
                    <Link to="/events">Help </Link>
                    </h2>
                <div className='bottomOptions'>
                    <h2 className='links'>
                    <Link to="/events"> Log Out </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};