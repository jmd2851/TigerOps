import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Fragment, useContext, useEffect, useState } from "react";
import { FormTypes } from "../../constants";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import config from "../../configs.json";
import {
  Card,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  Paper,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AppContext from "../../AppContext";

dayjs.extend(utc);

export default function EventForm(props) {
  const { formType, event, handleClose, refetch } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageAlt, setImageAlt] = useState("");

  const { showAlert } = useContext(AppContext);

  const handleClear = () => {
    setName("");
    setDescription("");
    setStartTime(null);
    setEndTime(null);
    setImageAlt("");
    setImage(null);
  };

  useEffect(() => {
    if (formType === FormTypes.EDIT) {
      setName(event.EventName);
      setDescription(event.EventDescription);
      setStartTime(dayjs.utc(event.EventStartTime));
      setEndTime(dayjs.utc(event.EventEndTime));
      setIsVisible(event.IsVisible == 1);
      setImage(event.ImagePath);
      setImageAlt(event.ImageAlt);
    }
  }, []);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!name || !description || !startTime || !endTime) {
      showAlert(
        "error",
        "Please fill out all fields before creating an event."
      );
      return;
    }
    if (startTime >= endTime) {
      showAlert("error", "Start time must be before end time.");
      return;
    }
    const body = {
      name,
      description,
      startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
      endTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
      imagePath: image.name,
      imageAlt,
      isVisible: isVisible ? 1 : 0,
    };
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    formData.append("image", image);
    axios
      .post(`${config[process.env.NODE_ENV].apiDomain}/events`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        handleClear();
        showAlert("success", "Successfully created an event.");
      })
      .catch((error) => showAlert("error", "Something went wrong..."));
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    if (!name || !description || !startTime || !endTime) {
      showAlert("error", "Please fill out all fields.");
      return;
    }
    if (startTime >= endTime) {
      showAlert("error", "Start time must be before end time.");
      return;
    }

    const body = {
      name,
      description,
      startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
      endTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
      isVisible: isVisible ? 1 : 0,
      imagePath: image instanceof File ? image.name : image,
      imageAlt,
      oldImagePath: event.ImagePath,
    };
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    if (image instanceof File) {
      formData.append("image", image);
    }
    axios
      .put(
        `${config[process.env.NODE_ENV].apiDomain}/events/${event.EventID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        showAlert("success", "Successfully edited the event.");
        handleClose();
        handleClear();
        refetch();
      })
      .catch((err) => {
        showAlert("error", "Something went wrong...");
      });
  };

  const handleDeleteEvent = (e) => {
    axios
      .delete(
        `${config[process.env.NODE_ENV].apiDomain}/events/${event.EventID}`
      )
      .then(() => {
        showAlert("success", "Successfully deleted an event.");
        handleClose();
        handleClear();
        refetch();
      })
      .catch((err) => {
        showAlert("error", "Something went wrong...");
      });
  };

  const handleCheckboxChange = (e) => {
    setIsVisible(e.target.checked);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop();
    const renamedFile = new File([file], `${Date.now()}.${fileExtension}`, {
      type: file.type,
    });
    setImageAlt("");
    setImage(renamedFile);
  };

  return (
    <div className="form">
      <FormControl
        sx={{
          position: "absolute",
          top: "34px",
          right: "0px",
          padding: "0 24px",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              labelPlacement="left"
              checked={isVisible}
              onChange={(e) => handleCheckboxChange(e)}
            />
          }
          label={"Visible?"}
        />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{ width: "100%" }}>
          <Stack direction="column" spacing={3}>
            <TextField
              fullWidth
              label="Name"
              id="name"
              variant="filled"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              id="description"
              variant="filled"
              margin="normal"
              multiline
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Card
              sx={{
                border: "1px solid rgba(211,211,211,0.6)",
              }}
            >
              <CardHeader
                title="Images"
                action={
                  <IconButton
                    onClick={() => setOpen(!open)}
                    aria-label="expand"
                    size="small"
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                }
              ></CardHeader>
              <div
                style={{
                  backgroundColor: "rgba(211,211,211,0.4)",
                }}
              >
                <Collapse in={open} timeout="auto">
                  <CardContent>
                    <Container>
                      {image ? (
                        <Fragment>
                          <img
                            src={
                              image instanceof File
                                ? URL.createObjectURL(image)
                                : `${
                                    config[process.env.NODE_ENV].apiDomain
                                  }/images/${image}`
                            }
                            style={{ width: "40%" }}
                          />
                          <TextField
                            fullWidth
                            label="Image Description"
                            id="imgAlt"
                            variant="filled"
                            margin="normal"
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                          />
                        </Fragment>
                      ) : null}
                      <Button variant="contained" component="label">
                        Upload Image
                        <input
                          type="file"
                          hidden
                          onChange={handleUploadImage}
                        />
                      </Button>
                    </Container>
                  </CardContent>
                </Collapse>
              </div>
            </Card>
            <Stack direction="row" spacing={2}>
              <DateTimePicker
                sx={{ width: "50%" }}
                label="Start Time"
                value={startTime}
                onChange={(date) => setStartTime(dayjs.utc(date))}
              />
              <DateTimePicker
                sx={{ width: "50%" }}
                label="End Time"
                value={endTime}
                onChange={(date) => setEndTime(dayjs.utc(date))}
              />
            </Stack>
            <Stack direction="row-reverse" spacing={2}>
              {formType === FormTypes.CREATE ? (
                <Button
                  variant="contained"
                  onClick={handleCreateEvent}
                  color="secondary"
                >
                  Create
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleEditEvent}
                  color="secondary"
                >
                  Save
                </Button>
              )}
              {formType === FormTypes.CREATE ? (
                <Button variant="text" onClick={handleClear}>
                  Clear
                </Button>
              ) : (
                // TODO: "are you sure" popover
                <Button variant="text" onClick={handleDeleteEvent}>
                  Delete this Slide
                </Button>
              )}
            </Stack>
          </Stack>
        </FormControl>
      </LocalizationProvider>
    </div>
  );
}
