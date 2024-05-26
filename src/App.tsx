import React, { useEffect, useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import EventDetails from './EventDetails';

interface Event {
  title: string;
  description: string;
  location: string;
  date: string;
  image_url: string;
}

const defaultEvent: Event = {
  title: "Event Title",
  description: "Description of the event goes here. This is a brief overview of what the event is about.",
  location: "Event Location",
  date: "Event Date",
  image_url: "jazz-cover.jpeg"
};

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/events/');
        setEvents(response.data.events);
        if (response.data.events.length > 0) {
          setCurrentEvent(events[4]);
        } else {
          setCurrentEvent(defaultEvent);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [events]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card flashcard-container">
        <EventDetails event={currentEvent} />
      </div>
    </div>
  );
}

export default App;