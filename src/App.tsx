import React, { useEffect, useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

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
          setCurrentEvent(events[0]);
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
        <div className="row g-0">
          <div className="col-md-4">
            <img src={currentEvent?.image_url} className="card-img-top" alt="Cover" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{currentEvent?.title}</h5>
              <p className="card-text">{currentEvent?.description}</p>
              <p className="card-text"><strong>Location:</strong> {currentEvent?.location}</p>
              <p className="card-text"><strong>Date:</strong> {currentEvent?.date}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-danger thumbs-button">
                  <i className="far fa-thumbs-down"></i>
                </button>
                <button className="btn btn-outline-success thumbs-button">
                  <i className="far fa-thumbs-up"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;