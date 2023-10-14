import "./styles.css";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import PageHeader from "../../components/PageHeader";
import Page from "../../components/Page";


export default function Calendar() {
  return (
    <Page>
      <PageHeader title="Calendar View" />
      <div className="calendarContainer">
        <div className="calendar">
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
    </Page>
  );
}
