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

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="row g-0">
      <div className="col-md-4">
        <img src={event?.image_url} className="card-img-top" alt="Cover" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{event?.title}</h5>
          <p className="card-text">{event?.description}</p>
          <p className="card-text"><strong>Location:</strong> {event?.location}</p>
          <p className="card-text"><strong>Date:</strong> {event?.date}</p>
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
  );
}

export default EventDetails;
