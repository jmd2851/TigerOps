import "./styles.css";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";


export default function Calendar() {
  return (
    <div className="calendarContainer">
      <div className="calendar">
        <h1>Calendar View</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
        <div className="event"> </div>
        <p className="description">
          Tap the <div className="circle"></div> on the calendar to check out
          the schedule for that day.
        </p>
      </div>
    </div>
  );
}
