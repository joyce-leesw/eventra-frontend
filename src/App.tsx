import React, { useEffect, useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import EventDetails from './EventDetails';

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

const API_URL = "http://127.0.0.1:8000";

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events/?limit=10`);
        setEvents(response.data.events);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (currentEventIndex === events.length && !loading) {
      console.log('preferences: ', JSON.stringify(preferences));

      const postPreferences = async () => {
        try {
          const response = await axios.post(`${API_URL}/preferences/`, preferences);
          console.log('POST response: ', response);
        } catch (error) {
          console.error('Error posting preferences:', error);
        }
      };
      postPreferences();
    }
  }, [currentEventIndex, events, preferences, loading]);

  const handleLikeClick = () => {
    setPreferences((prevPreferences: Preference[]) => [
      ...prevPreferences,
      { eventId: events[currentEventIndex].id, liked: true }
    ]);
    handleNext()
  };

  const handleDislikeClick = () => {
    setPreferences((prevPreferences: Preference[]) => [
      ...prevPreferences,
      { eventId: events[currentEventIndex].id, liked: false }
    ]);
    handleNext()
  };

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setCurrentEventIndex(prevIndex => prevIndex + 1);
    }, 500);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className={`card flashcard-container ${animate ? 'move' : ''}`}>
      {events.length > 0 && currentEventIndex < events.length && (
          <EventDetails 
            event={events[currentEventIndex]}
            onLikeClick={handleLikeClick}
            onDislikeClick={handleDislikeClick} 
          />
      )}
      { currentEventIndex === events.length && events.length !== 0 && (
          <div className="card-body">
            <h5 className="card-title">Thank you for registering your preferences</h5>
          </div>
      )}
      </div>
    </div>
  );
}

export default App;