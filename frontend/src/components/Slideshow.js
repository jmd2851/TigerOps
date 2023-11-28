import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { fetchSlides } from "../utils/slide_utils";
import dayjs from "dayjs";
import config from "../configs.json";

export default function Slideshow({ slideStyles, slideshowProps }) {
  const [sildeshowData, setSlideshowData] = useState([]);
  useEffect(() => {
    const today = dayjs().startOf("day");
    fetchSlides(today, today.add(7, "day")).then((res) => {
      setSlideshowData(res);
    });
  }, []);

  return (
    <>
      {/* https://github.com/Learus/react-material-ui-carousel#props */}
      <Carousel {...slideshowProps}>
        {sildeshowData
          .filter((slide) => slide.data.IsVisible)
          .map((slide) => {
            return (
              <Card sx={{ height: "100%", boxShadow: "0", ...slideStyles }}>
                <CardHeader
                  sx={{
                    backgroundColor: "var(--primary)",
                    padding: "40px 0",
                    textAlign: "center",
                    minHeight: "8%",
                  }}
                  title={slide.title}
                  titleTypographyProps={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                  subheader={slide.subheader}
                />

                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {slide.data.ImagePath ? ( //implement slide layout
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={2}
                      sx={{ padding: "20px", height: "inherit" }}
                    >
                      <Box sx={{ width: "60%" }}>
                        {slide.type === 1 ? ( //menu
                          slide.body.split(", ").map((group) => {
                            let temp = group.split("-");

                            return (
                              <Stack
                                variant="column"
                                spacing={-1}
                                sx={{ marginBottom: "0.5em" }}
                              >
                                <Typography sx={{ fontSize: "0.5em" }}>
                                  {temp[0]}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "0.7em", fontWeight: "bold" }}
                                >
                                  {temp[1]}
                                </Typography>
                              </Stack>
                            );
                          })
                        ) : (
                          //event
                          <Box sx={{ textAlign: "left" }}>
                            <Typography sx={{ fontSize: "0.7em" }}>
                              Join us for {slide.title}!
                            </Typography>
                            <Typography sx={{ fontSize: "0.7em" }}>
                              {slide.body}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <Box
                        sx={{
                          backgroundImage:
                            "url(" +
                            `${
                              config[process.env.NODE_ENV].apiDomain
                            }/images/` +
                            slide.data.ImagePath +
                            ")",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          width: "40%",
                          height: "70%",
                        }}
                      ></Box>
                    </Stack>
                  ) : (
                    // no image layout - centered
                    <Box sx={{ padding: "40px" }}>
                      {slide.type === 1 ? ( //menu
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {slide.body.split(", ").map((group) => {
                            let temp = group.split("-");

                            return (
                              <Stack
                                variant="column"
                                spacing={-1}
                                sx={{ marginBottom: "0.5em" }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "0.5em",
                                    textAlign: "center",
                                  }}
                                >
                                  {temp[0].trim()}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.7em",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {temp[1].trim()}
                                </Typography>
                              </Stack>
                            );
                          })}
                        </Box>
                      ) : (
                        //event
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ fontSize: "0.7em" }}>
                            Join us for {slide.title}!
                          </Typography>
                          <Typography sx={{ fontSize: "0.7em" }}>
                            {slide.body}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </CardContent>

                <Box
                  sx={{
                    position: "absolute",
                    left: "0",
                    bottom: "0",
                    height: "4%",
                    width: "100%",
                    backgroundColor: "var(--primary)",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    padding: "10px 20px",
                  }}
                >
                  <Typography variant="h7">
                    <span style={{ fontWeight: "bold" }}>Location</span>: 681
                    Brown Street Rochester, NY 14611
                  </Typography>
                  <Typography variant="h7">
                    <span style={{ fontWeight: "bold" }}>Phone</span>:
                    585-235-6511
                  </Typography>
                  <Typography variant="h7">
                    <span style={{ fontWeight: "bold" }}>Instagram</span>:
                    @stpeterskitchenroc
                  </Typography>
                </Box>
              </Card>
            );
          })}
      </Carousel>
    </>
  );
}
