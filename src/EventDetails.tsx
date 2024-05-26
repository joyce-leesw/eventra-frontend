import React from 'react';

interface Event {
  title: string;
  description: string;
  location: string;
  date: string;
  image_url: string;
}

interface EventDetailsProps {
  event: Event | null;
}

const defaultEvent: Event = {
  title: "Event Title",
  description: "Description of the event goes here. This is a brief overview of what the event is about.",
  location: "Event Location",
  date: "Event Date",
  image_url: "jazz-cover.jpeg"
};

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const eventToDisplay = event || defaultEvent;

  return (
    <div className="row g-0">
      <div className="col-md-4">
        <img src={eventToDisplay.image_url} className="card-img-top" alt="Cover" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{eventToDisplay.title}</h5>
          <p className="card-text">{eventToDisplay.description}</p>
          <p className="card-text"><strong>Location:</strong> {eventToDisplay.location}</p>
          <p className="card-text"><strong>Date:</strong> {eventToDisplay.date}</p>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
