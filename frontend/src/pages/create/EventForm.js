import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { FormTypes } from "../../constants";
import axios from "axios";
import config from "../../configs.json";
import { FormControl, Stack } from "@mui/material";
import dayjs from "dayjs";

export default function EventForm(props) {
  const { formType, event } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleClear = () => {
    setName("");
    setDescription("");
    setStartTime(null);
    setEndTime(null);
  };

  useEffect(() => {
    if (formType === FormTypes.EDIT) {
      console.log(event)
      setName(event.EventName);
      setDescription(event.EventDescription);
      setStartTime(dayjs(event.EventStartTime));
      setEndTime(dayjs(event.EventEndTime));
    }
  }, []);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!name || !description || !startTime || !endTime) {
      alert("Please fill out all fields before creating the event.");
      return;
    }
    if (startTime >= endTime) {
      alert("End time must be after the start time.");
      return;
    }
    const body = {
      name,
      description,
      startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
      endTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    axios
      .post(
        `${config[process.env.NODE_ENV].apiDomain}/events`,
        body,
        axiosConfig
      )
      .then((response) => {
        handleClear();
      })
      .catch((error) => console.log(error));
  };

  const handleEditEvent = () => {};

  const handleDeleteEvent = () => {};

  return (
    <div className="form">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{width:'100%'}}>
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
            
            <Stack direction="row" spacing={2}>
              <DateTimePicker
                sx={{width:'50%'}}
                label="Start Time"
                value={startTime}
                onChange={(date) => setStartTime(date)}
              />
              <DateTimePicker
                sx={{width:'50%'}}
                label="End Time"
                value={endTime}
                onChange={(date) => setEndTime(date)}
              />
            </Stack>

            <Stack direction="row-reverse" spacing={2}>
              {formType === FormTypes.CREATE ? (
                <Button variant="contained"  onClick={handleCreateEvent} color="secondary">Create</Button>
              ) : (
                <Button variant="contained" onClick={handleEditEvent} color="secondary">Save</Button>
              )}
              {formType === FormTypes.CREATE ? (
                <Button variant="text" onClick={handleClear}>Clear</Button>
              ) : (
                // TODO: "are you sure" popover
                <Button variant="text" onClick={handleDeleteEvent}>Delete this Slide</Button>
              )}
            </Stack>
          </Stack>
        </FormControl>
      </LocalizationProvider>
    </div>
  );
}
