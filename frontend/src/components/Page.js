import React from 'react';
import './Page.css';
import Navigation from "./navigation.js";
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

export default function Page({title, subtitle, children}) {
    return (
        <div className='page'>
            <div className='navBar'>
               <Navigation/>
            </div>

            <div className='contentContainer'>
                <div className='heading'>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="body1">{subtitle}</Typography>
                </div>

                <Card className='content' sx={{boxShadow:'0'}}>
                    {children}
                </Card>
            </div>
        </div>
    )
}