import React, { useEffect, useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import EventDetails from './EventDetails';
import { json } from 'stream/consumers';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image_url: string;
}

interface Preference {
  eventId: number;
  liked: boolean;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [preferences, setPreferences] = useState<Preference[]>([]);

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

  useEffect(() => {
    if (currentEventIndex === events.length) {
      console.log('currentEventIndex is equal to the length of events');
      console.log('preferences: ', JSON.stringify(preferences));
    }
  }, [currentEventIndex, events]);

  const handleLikeClick = () => {
    setPreferences((prevPreferences: Preference[]) => [
      ...prevPreferences,
      { eventId: events[currentEventIndex].id, liked: true }
    ]);
    setCurrentEventIndex(prevIndex => prevIndex + 1);
  };

  const handleDislikeClick = () => {
    setPreferences((prevPreferences: Preference[]) => [
      ...prevPreferences,
      { eventId: events[currentEventIndex].id, liked: false }
    ]);
    setCurrentEventIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {events.length > 0 && currentEventIndex < events.length && (
        <div className="card flashcard-container">
          <EventDetails 
            event={events[currentEventIndex]}
            onLikeClick={handleLikeClick}
            onDislikeClick={handleDislikeClick} 
          />
        </div>
      )}
      { currentEventIndex === events.length && (
        <div className="card flashcard-container">
          <div className="card-body">
            <h5 className="card-title">Thank you for registering your preferences</h5>
          </div>
        </div>
      
      )}
    </div>
  );
}

export default App;