import { useEffect, useState } from 'react';
import './Slideshow.css';
import Carousel from 'react-material-ui-carousel';
import { Card, CardHeader } from '@mui/material';

export default function Slideshow({slideStyles, slideshowProps}) {
     const [sildeshowData, setSlideshowData] = useState([]);
     useEffect(() => {
        //TODO: get slideshow data from db

        setSlideshowData([
            {
                id: 0,
                type: "event",
                title: "title1",
                description: "description1",
                bg: "lightblue"
            },
            {
                id: 1,
                type: "menu",
                title: "title2",
                description: "description2",
                bg: "lightcoral"
            },
            {
                id: 2,
                type: "event",
                title: "title3",
                description: "description3",
                bg: "lightgreen"
            },
            {
                id: 3,
                type: "menu",
                title: "title4",
                description: "description4",
                bg: "lightsalmon"
            },
        ]);
     },[]);

    return (
        <>
            {/* https://github.com/Learus/react-material-ui-carousel#props */}
            <Carousel {...slideshowProps}>
                {sildeshowData.map((slide) => {
                    return (
                        <Card className='slide' sx={{height:'100%', boxShadow:'0', ...slideStyles, backgroundColor: slide.bg}}>
                            <CardHeader title={slide.title} subheader={slide.description} />
                        </Card>
                    )
                })}
            </Carousel>
        </>
    )
}