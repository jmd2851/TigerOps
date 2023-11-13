import "./styles.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers";
import { useContext, useEffect, useState } from "react";

import Page from "../../components/Page";
import dayjs from "dayjs";
import axios from "axios";
import Badge from "@mui/material/Badge";
import config from "../../configs.json";
import utc from "dayjs/plugin/utc";
import AppContext from "../../AppContext";

dayjs.extend(utc);
function CalendarEvents(props) {
  const { events, date } = props;
  return (
    <div className = "container">
      <div className="Events">
        <h3>Events for the date {date}</h3>
        {Object.values(events).map((event) => (
          console.log(event),
          <div key={event.EventId}>
          <div className="Event">
            <hr class ="divider"/>
            <h3>{event.EventName}</h3>
            <h4>Start Time:</h4>
            <p>Start Time: {event.EventStartTime}</p>
            <h4>End Time:</h4>
            <p>{event.EventEndTime}</p>
            <h4>Description:</h4>
            <p>{event.EventDescription}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
}

function EventDay(props) {
  const { events = [], day, outsideCurrentMonth, ...other } = props;
  const date = day.format("YYYY-MM-DD");
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        !props.outsideCurrentMonth && events[date] !== undefined
          ? <div className = "calendarCircle"> </div> : undefined
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
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    currentDate.format("YYYY-MM-DD")
  );

  const { showAlert } = useContext(AppContext);

  const fetchEvents = (startTime, endTime) => {
    setCalendarLoading(true);
    axios
      .get(`${config[process.env.NODE_ENV].apiDomain}/events`, {
        params: {
          startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
          endTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
        },
      })
      .then((response) => {
        const groupedEvents = response.data.events.reduce((grouped, event) => {
          const startDate = dayjs(event.EventStartTime).format("YYYY-MM-DD");
          const endDate = dayjs(event.EventEndTime).format("YYYY-MM-DD");
          if (!grouped[startDate]) {
            grouped[startDate] = {};
          }
          grouped[startDate][event.EventID] = event;
          if (!grouped[endDate]) {
            grouped[endDate] = {};
          }
          grouped[endDate][event.EventID] = event;
          return grouped;
        }, {});
        setEvents({
          ...events,
          ...groupedEvents,
        });
      })
      .catch(() => {
        showAlert("error", "Something went wrong...");
      })
      .finally(() => setCalendarLoading(false));
  };

  useEffect(() => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    fetchEvents(startOfMonth, endOfMonth);
  }, []);

  const handleMonthChange = (date) => {
    const startOfMonth = dayjs.utc(date).startOf("month");
    const endOfMonth = dayjs.utc(date).endOf("month");
    fetchEvents(startOfMonth, endOfMonth);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  return (
    <Page title="Calendar View">
      <div className = "container">
        <div className="calendarContainer">
          <div className="calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={currentDate}
                loading={calendarLoading}
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
            <div className="Event">
            <CalendarEvents
              events={events[[selectedDate]] || {}}
              date={selectedDate}
            />
            </div>

          </div>
        </div>
        </div>
        <p className="description">
              Tap the <div className="circle"></div> on the calendar to check out
              the schedule for that day.
            </p>
    </Page>
  );
}
