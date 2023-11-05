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
import config from "../../configs.json";
import axios from "axios";

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

  const fetchSlides = () => {
    if (!startDate || !endDate) {
      console.error("Both startDate and endDate fields are required.");
      return;
    }
    if (startDate >= endDate) {
      console.error("End time must be after the start time.");
      return;
    }
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    axios
      .all([
        axios.get(
          `${config[process.env.NODE_ENV].apiDomain}/menus`,
          {
            params: {
              startDate: startDate.format("YYYY-MM-DD"),
              endDate: endDate.format("YYYY-MM-DD"),
            },
          },
          axiosConfig
        ),
        axios.get(
          `${config[process.env.NODE_ENV].apiDomain}/events`,
          {
            params: {
              startTime: startDate.format("YYYY-MM-DD HH:mm:ss"),
              endTime: endDate.format("YYYY-MM-DD HH:mm:ss"),
            },
          },
          axiosConfig
        ),
      ])
      .then(([res1, res2]) => {
        const menuSlides = res1.data.menus.map((menu) => {
          const descriptions = [];
          for (const [label, description] of Object.entries(menu.MenuData)) {
            descriptions.push(`${label} - ${description}`);
          }
          const date = dayjs(menu.Date.split("T")[0]);
          return new Slide(
            `${date.format("MMMM D, YYYY")} Menu`,
            "",
            descriptions.join(", "),
            SlideTypes.MENU,
            menu,
            date
          );
        });
        const eventSlides = res2.data.events.map((event) => {
          const startTime = dayjs(event.EventStartTime);
          const endTime = dayjs(event.EventEndTime);

          return new Slide(
            event.EventName,
            `${startTime.format("MMMM D, YYYY h:mmA")} through ${endTime.format(
              "MMMM D, YYYY h:mmA"
            )}`,
            event.EventDescription,
            SlideTypes.EVENT,
            event,
            startTime,
            endTime
          );
        });
        const sortedSlides = [...menuSlides, ...eventSlides].sort((a, b) => {
          return a.start < b.start;
        });
        setSlides(sortedSlides);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchSlides();
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
        <DatePicker
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
          label="End Date"
          value={endDate}
          onChange={(date) => {
            const startOfDay = date.startOf("day");
            if (startOfDay < startDate) {
              alert("End date cannot be before start date.");
              return;
            }
            setEndDate(startOfDay);
            fetchSlides();
          }}
        />
      </LocalizationProvider>
      <Stack spacing={{ sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        {slides.map((slide) => {
          return (
            <Card
              sx={{
                width: "45%",
                minHeight: "280px",
                boxShadow: "rgb(0, 0, 0, 0.25)",
                backgroundColor: "#d6dad6",
              }}
            >
              <CardActionArea
                onClick={() => {
                  handleOpen();
                  setSelectedSlide(slide);
                }}
                sx={{ height: "100%" }}
              >
                <CardHeader title={slide.title} subheader={slide.subheader} />
                <CardContent>
                  <Typography sx={{ fontSize: "0.6em", paddingTop: "16px" }}>
                    {slide.body}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>
    </Page>
  );
}
