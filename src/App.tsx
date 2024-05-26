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

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/events/');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleClick = (increment: number) => {
    setCurrentEventIndex(prevIndex => {
      let newIndex = prevIndex + increment;
      if (newIndex < 0) {
        newIndex = events.length - 1;
      } else if (newIndex >= events.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {events.length > 0 && (
        <div className="card flashcard-container">
          <EventDetails event={events[currentEventIndex]} />
          <div className="d-flex justify-content-between mt-7">
            <button className="btn btn-outline-danger thumbs-button" onClick={() => handleClick(-1)}>
              <i className="far fa-thumbs-down"></i>
            </button>
            <button className="btn btn-outline-success thumbs-button" onClick={() => handleClick(1)}>
              <i className="far fa-thumbs-up"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;