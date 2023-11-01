import React from 'react';
import './PageHeader.css';
import { Typography } from '@mui/material';

export default function PageHeader({title,subtitle,sx}) {
    return (
        <div className='heading' styles={{...sx}}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1">{subtitle}</Typography>
        </div>
    )
}