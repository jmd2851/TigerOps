import React from 'react';
import './PageHeader.css';
import { Typography } from '@mui/material';

export default function PageHeader({title,subtitle}) {
    return (
        <div className='heading'>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1">{subtitle}</Typography>
        </div>
    )
}