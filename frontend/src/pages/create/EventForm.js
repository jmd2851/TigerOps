import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { FormTypes } from "../../constants";
import axios from "axios";
import config from "../../configs.json";

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
      // Perform any additional logic for editing here.
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
    <div className="eventForm">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DateTimePicker
          label="Start Time"
          value={startTime}
          onChange={(date) => setStartTime(date)}
        />
        <DateTimePicker
          label="End Time"
          value={endTime}
          onChange={(date) => setEndTime(date)}
        />
        {formType === FormTypes.CREATE ? (
          <Button onClick={handleClear}>Clear</Button>
        ) : (
          <Button onClick={handleDeleteEvent}>Delete</Button>
        )}
        {formType === FormTypes.CREATE ? (
          <Button onClick={handleCreateEvent}>Create Event</Button>
        ) : (
          <Button onClick={handleEditEvent}>Edit Event</Button>
        )}
      </LocalizationProvider>
    </div>
  );
}
