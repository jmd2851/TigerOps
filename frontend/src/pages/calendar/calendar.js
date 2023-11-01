import "./styles.css";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import PageHeader from "../../components/PageHeader";
import Page from "../../components/Page";
import dayjs from "dayjs";
import axios from "axios";
import Badge from "@mui/material/Badge";

import { PickersDay } from "@mui/x-date-pickers";

function CalendarEvents(props) {
  const { events, date } = props;
  return (
    <div>
      <h3>Event for the date {date}</h3>
      {events.map((event) => (
        <div key={event.EventId}>
          <h3>{event.EventName}</h3>
          <p>{event.EventStartTime}</p>
          <p>{event.EventEndTime}</p>
        </div>
      ))}
    </div>
  );
}

function EventDay(props) {
  const { events = [], day, outsideCurrentMonth, ...other } = props;
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        !props.outsideCurrentMonth &&
        events[day.format("YYYY-MM-DD")] !== undefined
          ? events[day.format("YYYY-MM-DD")].length
          : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const currentDate = dayjs();

export default function Calendar() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [events, setEvents] = React.useState({});
  const [selectedDate, setSelectedDate] = React.useState(
    currentDate.format("YYYY-MM-DD")
  );

  const fetchEvents = (startDate, endDate) => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/events", {
        params: {
          startdate: startDate.format("YYYY-MM-DD HH:mm:ss"),
          enddate: endDate.format("YYYY-MM-DD HH:mm:ss"),
        },
      })
      .then((response) => {
        const groupedEvents = response.data.events.reduce((grouped, event) => {
          const startdate = dayjs(event.EventStartTime).format("YYYY-MM-DD");
          const enddate = dayjs(event.EventEndTime).format("YYYY-MM-DD");
          if (!grouped[startdate]) {
            grouped[startdate] = [];
          }
          grouped[startdate].push(event);
          if (!grouped[enddate]) {
            grouped[enddate] = [];
          }
          grouped[enddate].push(event);
          return grouped;
        }, {});
        setEvents({
          ...events,
          ...groupedEvents,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    fetchEvents(startOfMonth, endOfMonth);
  }, []);

  const handleMonthChange = (date) => {
    const startOfMonth = date.startOf("month");
    const endOfMonth = date.endOf("month");
    fetchEvents(startOfMonth, endOfMonth);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  return (
    <Page title="Calendar View" >
      <div className="calendarContainer">
        <div className="calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={currentDate}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              onChange={handleDateChange}
              slots={{
                day: EventDay,
              }}
              slotProps={{
                day: {
                  events,
                },
              }}
            />
          </LocalizationProvider>
          <div className="event"> </div>
          <p className="description">
            Tap the <div className="circle"></div> on the calendar to check out
            the schedule for that day.
          </p>
          <CalendarEvents
            events={events[[selectedDate]] || []}
            date={selectedDate}
          />
        </div>
      </div>
    </Page>
  );
}
