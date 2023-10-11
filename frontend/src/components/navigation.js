import React from 'react';
import './navigation.css';

export default function Navigation (){
        return (
            <div className='navContainer'>
            <div className = "nav">
                        <h1 className = "User">
                            Admin
                        </h1>
                        <div className='calendarOptions'>
                            <div className='topOptions'>
                                <h2 className='links'>
                                    Events
                                </h2>
                            </div>
                            <div className='topOptions'>
                                <h2 className = "links">
                                    Calendar View
                                </h2>
                            </div>
                        </div>
                        <div className='border'>
                           
                        </div>
                            <div className='bottomOptions'>
                                <h2 className='links'>
                                    Configuration
                                </h2>
                            </div>
                                <h2 className='links'>
                                    Help
                                </h2>
                            <div className='bottomOptions'>
                                <h2 className='links'>
                                    Log Out
                                </h2>
                            </div>
            </div>
            </div>
          );
};