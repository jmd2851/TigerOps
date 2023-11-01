import React from 'react';
import './Page.css';
import Navigation from "./navigation.js";
import Card from '@mui/material/Card';
import PageHeader from './PageHeader';

export default function Page({title, subtitle, children}) {
    return (
        <div className='page'>
            <div className='navBar'>
               <Navigation/>
            </div>

            <div className='contentContainer'>
                <PageHeader title={title} subtitle={subtitle}/>

                <Card className='content' sx={{boxShadow:'0'}}>
                    {children}
                </Card>
            </div>
        </div>
    )
}