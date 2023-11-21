import { useEffect, useState } from "react";
import "./Slideshow.css";
import Carousel from "react-material-ui-carousel";
import { Box, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { fetchSlides } from "../utils/slide_utils";
import dayjs from "dayjs";

export default function Slideshow({ slideStyles, slideshowProps }) {
  const [sildeshowData, setSlideshowData] = useState([]);
  useEffect(() => {
    const today = dayjs().startOf("day");
    fetchSlides(today, today.add(7, "day")).then((res) =>
      setSlideshowData(res)
    );

    //for testing purposes, remove once image issue is fixed
    // setSlideshowData([
    //   {
    //     title: 'menu example',
    //     subheader: 'menu for monday, nov 20',
    //     type: 1,
    //     body: ['main dish - dirt', 'vegetable - more dirt'],
    //     imgPath: '../assets/images/building.jpg',
    //     imgAlt: 'st peters kitchen'
    //   },
    //   {
    //     title: 'event example',
    //     subheader: 'monday, nov 20 12:00pm - tuesday, nov 21 12:00pm',
    //     type: 0,
    //     body: 'event description',
    //     imgPath: '../assets/images/building.jpg',
    //     imgAlt: 'st peters kitchen'
    //   },
    // ]);
  }, []);

  const slideImgStyle = {
    backgroundColor: 'green',
    width:'40%', 
    height: '70%',
  }

  return (
    <>
      {/* https://github.com/Learus/react-material-ui-carousel#props */}
      <Carousel {...slideshowProps}>
        {sildeshowData.map((slide) => {
          return (
            <Card sx={{height: "100%", boxShadow: "0", ...slideStyles}}>
              <CardHeader 
                sx={{backgroundColor:'var(--primary)', padding:'40px 0', textAlign:'center', minHeight:'8%'}}
                title={slide.title} 
                titleTypographyProps={{
                  fontWeight:'bold',
                  textTransform:'uppercase',
                }}
                subheader={slide.subheader} />

              <CardContent sx={{height:'100%', display:'flex',flexDirection:'column', justifyContent:'space-between'}}>

                {slide.imgPath ? //implement slide layout
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'40px'}}>
                    <Box>
                      {slide.type === 1 ? //menu
                        slide.body.map((group) => {
                          let temp = group.split("-");

                          return (
                            <Stack variant="column" spacing={-1} sx={{marginBottom:'0.5em'}}>
                              <Typography sx={{fontSize:"0.5em"}}>{temp[0]}</Typography>
                              <Typography sx={{fontSize:"0.7em",fontWeight:'bold'}}>{temp[1]}</Typography>
                            </Stack>
                          )
                        })
                      : //event
                        <Box sx={{textAlign:'center'}}>
                          <Typography sx={{fontSize:"0.7em"}}>Join us for {slide.title}!</Typography>
                          <Typography sx={{fontSize:"0.7em"}}>{slide.body}</Typography>
                        </Box>
                      }
                    </Box>

                    <Box sx={{...slideImgStyle}}>
                      <img src={slide.imgPath} alt={slide.imgAlt || ""} height="100%" width="100%"/>
                    </Box>
                  </Box>
                :
                // no image layout - centered
                <Box sx={{padding:'40px'}}>
                  {slide.type === 1 ? //menu
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                      {slide.body.map((group) => {
                        let temp = group.split("-");

                        return (
                          <Stack variant="column" spacing={-1} sx={{marginBottom:'0.5em'}}>
                            <Typography sx={{fontSize:"0.5em", textAlign:'center'}}>{temp[0].trim()}</Typography>
                            <Typography sx={{fontSize:"0.7em", textAlign:'center',fontWeight:'bold'}}>{temp[1].trim()}</Typography>
                          </Stack>
                        )
                      })}
                    </Box>
                  : //event
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                      <Typography sx={{fontSize:"0.7em"}}>Join us for {slide.title}!</Typography>
                      <Typography sx={{fontSize:"0.7em"}}>{slide.body}</Typography>
                    </Box>
                  }
                </Box>
                }

              </CardContent>

              <Box sx={{position:'absolute',left:'0',bottom:'0',height:'4%', width:'100%',backgroundColor:'var(--primary)', display:'flex', flexDirection:'row', justifyContent:'space-around',padding:'10px 20px'}}>
                <Typography variant="h7"><span style={{fontWeight:'bold'}}>Location</span>: 681 Brown Street Rochester, NY 14611</Typography>
                <Typography variant="h7"><span style={{fontWeight:'bold'}}>Phone</span>: 585-235-6511</Typography>
                <Typography variant="h7"><span style={{fontWeight:'bold'}}>Instagram</span>: @stpeterskitchenroc</Typography>
              </Box>

            </Card>
          );
        })}
      </Carousel>
    </>
  );
}
