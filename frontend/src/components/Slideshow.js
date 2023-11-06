import { useEffect, useState } from "react";
import "./Slideshow.css";
import Carousel from "react-material-ui-carousel";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { fetchSlides } from "../utils/slide_utils";
import dayjs from "dayjs";

export default function Slideshow({ slideStyles, slideshowProps }) {
  const [sildeshowData, setSlideshowData] = useState([]);
  useEffect(() => {
    const today = dayjs().startOf("day");
    fetchSlides(today, today.add(7, "day")).then((res) =>
      setSlideshowData(res)
    );
  }, []);

  return (
    <>
      {/* https://github.com/Learus/react-material-ui-carousel#props */}
      <Carousel {...slideshowProps}>
        {sildeshowData.map((slide) => {
          return (
            <Card
              className="slide"
              sx={{
                height: "100%",
                boxShadow: "0",
                ...slideStyles,
              }}
            >
              <CardHeader title={slide.title} subheader={slide.subheader} />
              <CardContent>
                <Typography sx={{ fontSize: "0.6em", paddingTop: "16px" }}>
                  {slide.body}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Carousel>
    </>
  );
}
