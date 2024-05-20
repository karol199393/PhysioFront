import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [calendars, setCalendars] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/calendars/getAllCalendars')
            .then(response => {
                setCalendars(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const onChange = date => {
        setDate(date);
        const eventsOnSelectedDate = calendars.filter(calendar => 
            new Date(calendar.date).toDateString() === date.toDateString()
        );
        setSelectedEvents(eventsOnSelectedDate);
    }

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={date}
            />
            <div>
                {selectedEvents.map(event => (
                    <div key={event.id}>
                        <h2>{event.stuff}</h2>
                        <p>{event.patient}</p>
                        <p>{new Date(event.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyCalendar;