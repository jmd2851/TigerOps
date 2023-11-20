import { useEffect, useState } from "react";
import "./Slideshow.css";
import Carousel from "react-material-ui-carousel";
import { Box, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";
import { fetchSlides } from "../utils/slide_utils";
import dayjs from "dayjs";

export default function Slideshow({ slideStyles, slideshowProps }) {
  const [sildeshowData, setSlideshowData] = useState([]);
  useEffect(() => {
    const today = dayjs().startOf("day");
    // fetchSlides(today, today.add(7, "day")).then((res) =>
    //   setSlideshowData(res)
    // );

    setSlideshowData([
      {
        title:'Saint Peters Kitchen',
        subheader:'Menu for November 12, 2023',
        imgPath: "url('../assets/images/building.jpg)",
        body: ['hi','hi']
      },
      {
        title:'Some Crazy Event Title that is particularly long like super duper',
        subtitle:'subtitle2',
        imgPath: "url('../assets/images/kitchen.jpg')",
        body: ['hi','hi']
      }
    ]);
  }, []);

  return (
    <>
      {/* https://github.com/Learus/react-material-ui-carousel#props */}
      <Carousel {...slideshowProps}>
        {sildeshowData.map((slide) => {
          console.log(slide);

          const slideImgStyle = {
            backgroundImage: `url('../assets/images/building.jpg')`,
            backgroundColor:'green',
            width:'40%', 
            height: '70%',
          }

          return (
            <Card sx={{height: "100%", boxShadow: "0", ...slideStyles}}>
              <CardHeader 
                sx={{backgroundColor:'red', padding:'20px 0', textAlign:'center', minHeight:'8%'}}
                title={slide.title} 
                subheader={slide.subheader} />

              <CardContent sx={{backgroundColor:'blue', height:'100%', padding:'40px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Typography sx={{ fontSize: "0.6em" }}>
                  {slide.body}
                </Typography>

                <Box sx={{...slideImgStyle}} className="img" />
              </CardContent>

            </Card>
          );
        })}
      </Carousel>
    </>
  );
}
