import { useEffect, useState } from 'react';
import './Slideshow.css';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

export default function Slideshow() {
     const [sildeshowData, setSlideshowData] = useState([]);
     useEffect(() => {
        //TODO: get slideshow data from db

        //set the slideshow data
        setSlideshowData([
            {
                "id": 0,
                "title": "title1",
                "description": "description1"
            },
            {
                "id": 1,
                "title": "title2",
                "description": "description2"
            },
            {
                "id": 2,
                "title": "title3",
                "description": "description3"
            },
            {
                "id": 3,
                "title": "title4",
                "description": "description4"
            },
        ]);

        console.log('slideshowdata: ' + JSON.stringify(sildeshowData));
     },[]);

     
    //TODO: handle slideshow buttons
     function handleClick() {}


    return (
        <div className='slideshowContainer'>

            <div className='slideshowControlsContainer'>
                <div className='leftButton'>
                    <IconButton aria-label="left" onClick={() => {
                        console.log('left button clicked');
                    }}>
                        <ArrowBackIosNewRoundedIcon />
                    </IconButton>
                </div>
                <div className='rightButton'>
                    <IconButton aria-label="right" onClick={() => {
                        console.log('right button clciked');
                    }}>
                        <ArrowForwardIosRoundedIcon />
                    </IconButton>
                </div>
            </div>

            <div className='slideshow'>
                {sildeshowData.map((slide) => {
                    return (
                        <div className='slide' key={slide.id}>
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}