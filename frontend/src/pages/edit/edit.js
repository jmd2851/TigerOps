import "./styles.css";
import Page from "../../components/Page";
import {
  Stack,
  Card,
  Typography,
  CardContent,
  CardHeader,
  CardActionArea,
  Modal,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormTypes, Slide, SlideTypes } from "../../constants";
import EventForm from "../create/EventForm";
import MenuForm from "../create/MenuForm";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { fetchSlides } from "../../utils/slide_utils";
import Grid from '@mui/material/Unstable_Grid2';

dayjs.extend(utc);

const today = dayjs().startOf("day");

export default function Edit() {
  const [open, setOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today.add(7, "day"));
  const [slides, setSlides] = useState([]);


  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    fetchSlides(startDate, endDate).then((res) => {
      setSlides(res);
    });
  }, [startDate, endDate]);

  // TODO: export as reusable modal component
  const modalStyle = {
    position: "absolute",
    marginTop: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    overflow: "scroll",
  };

  return (
    <Page
      title="Edit a slide"
      subtitle="Pick a slide from the current slideshow to edit."
      style={{ zIndex: "0" }}
    >
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setSelectedSlide(null);
        }}
      >
        <Box
          sx={{
            ...modalStyle,
            width: "500px",
            height: "580px",
            paddingTop: "40px",
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="h5">
              {selectedSlide ? selectedSlide.title : ""}
            </Typography>
            {selectedSlide !== null ? (
              selectedSlide.type === SlideTypes.EVENT ? (
                <EventForm
                  formType={FormTypes.EDIT}
                  event={selectedSlide.data}
                />
              ) : (
                <MenuForm formType={FormTypes.EDIT} menu={selectedSlide.data} />
              )
            ) : null}
          </Stack>
        </Box>
      </Modal>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={2} sx={{paddingTop: '8px',marginTop: '8px'}}>
          <DatePicker
            sx={{width:'50%', minHeight:'80px'}}
            label="Start Date"
            value={startDate}
            onChange={(date) => {
              const startOfDay = date.startOf("day");
              if (startOfDay > endDate) {
                alert("Start date cannot be after end date.");
                return;
              }
              setStartDate(startOfDay);
            }}
          />

          <DatePicker
            sx={{width:'50%', minHeight:'80px'}}
            label="End Date"
            value={endDate}
            onChange={(date) => {
              const startOfDay = date.startOf("day");
              if (startOfDay < startDate) {
                alert("End date cannot be before start date.");
                return;
              }
              setEndDate(startOfDay);
            }}
          />
        </Stack>
      </LocalizationProvider>

      
      <Box sx={{flexGrow:1}}>
        <Grid container spacing={{xs:2, m:3}} columns={{xs:4, sm:8, md:12}}>
        {/* <Stack spacing={{ sm: 2 }} direction="row" useFlexGap flexWrap="wrap"> */}
          {slides.map((slide) => {
            return (
              <Grid xs={3} sm={5} md={6} key={slide.id}>
                <Card
                  sx={{
                    margin: "16px",
                    minHeight: "360px",
                    boxShadow: "rgb(0, 0, 0, 0.25)",
                    backgroundColor: "#d6dad6",
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      handleOpen();
                      setSelectedSlide(slide);
                    }}
                    sx={{ minHeight: "360px" }}
                  >
                    <CardHeader title={slide.title} subheader={slide.subheader} />
                    <CardContent>
                      <Typography variant="body2">
                        {slide.body}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        {/* </Stack> */}
        </Grid>
      </Box>
    </Page>
  );
}
