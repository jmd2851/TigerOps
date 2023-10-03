import { useEffect, useState } from 'react';
import './Slideshow.css';
import Carousel from 'react-material-ui-carousel';

export default function Slideshow() {
     const [sildeshowData, setSlideshowData] = useState([]);
     useEffect(() => {
        //TODO: get slideshow data from db

        //set the slideshow data
        setSlideshowData([
            {
                "id": 0,
                "title": "title1",
                "description": "description1",
                "bg": "lightblue"
            },
            {
                "id": 1,
                "title": "title2",
                "description": "description2",
                "bg": "lightcoral"
            },
            {
                "id": 2,
                "title": "title3",
                "description": "description3",
                "bg": "lightgreen"
            },
            {
                "id": 3,
                "title": "title4",
                "description": "description4",
                "bg": "lightsalmon"
            },
        ]);

        console.log('slideshowdata: ' + JSON.stringify(sildeshowData));
     },[]);

     
    //TODO: handle slideshow buttons
     function handleClick() {}


    return (
        <div className='slideshowContainer'>
            {/* https://github.com/Learus/react-material-ui-carousel#props */}
            <Carousel 
                className='slideshow' 
                height={'600px'} 
                fullHeightHover={true} 
                navButtonsAlwaysVisible={true}
                interval={10000} //10 seconds
                animation='slide'
                indicatorContainerProps={{
                    style: {
                        paddingBottom: '8px',
                    }
                }}>

                {sildeshowData.map((slide) => {
                    return (
                        //TODO: create reusable slide component
                        <div className='slide' key={slide.id} style={{backgroundColor: slide.bg}}>
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}