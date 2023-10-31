import React from 'react';
import './PageHeader.css';
import Title from "./Title";
import Button from '@mui/material/Button';
import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import { Typography } from '@mui/material';

export default function PageHeader(props) {
    //state & function to showicons settings or not depending on the user

    return (
        <div className='eventsHeader'>
            <Typography variant="h4" className='headerTitle'>{props.title}</Typography>
            {/* <div className='iconContainer'>
                <div className='iconGroup'>
                    <Button variant="contained" 
                        onClick={() => alert('add button clicked')}
                        startIcon={<QueueRoundedIcon />}>
                        <p>add</p>
                    </Button>
                </div>
                <div className='iconGroup'>
                    <Button variant="contained" 
                        onClick={() => alert('edit button clicked')}
                        startIcon={<AutoFixHighRoundedIcon />}>
                        <p>edit</p>
                    </Button>
                </div>
                <div className='iconGroup'>   
                    <Button variant="contained" 
                        onClick={() => alert('delete button clicked')}
                        startIcon={<DeleteRoundedIcon />}>
                        <p>delete</p>
                    </Button>
                </div>
            </div> */}
        </div>
    )
}