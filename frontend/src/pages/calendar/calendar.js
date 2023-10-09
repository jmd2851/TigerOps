import ReactDOM from 'react-dom/client';
import './styles.css';
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Navigation } from '../../components/navigation/navigation.js'


export default function Calendar() {
  return (
    <div className='calendarContainer'>
      <Navigation />
      <div className='calendar'>
        <h1>
          Calendar View
        </h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar/>
        </LocalizationProvider>
        <div className='event'> </div>
        <p className='description'>
            Tap the <div className='circle'></div> on the calendar to check out the schedule for that day.
        </p>
      </div>
    </div>
  );
}


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Calendar />);