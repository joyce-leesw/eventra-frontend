import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card flashcard-container">
        <div className="row g-0">
          <div className="col-md-4">
            <img src="jazz-cover.jpeg" className="card-img-top" alt="Cover" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Event Title</h5>
              <p className="card-text">Description of the event goes here. This is a brief overview of what the event is about.</p>
              <p className="card-text"><strong>Location:</strong> Event Location</p>
              <p className="card-text"><strong>Time:</strong> Event Time</p>
              <p className="card-text"><strong>Date:</strong> Event Date</p>
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