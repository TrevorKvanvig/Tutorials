import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkOutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

// use WorkoutsContextProvider component to wrap app and make props.children be <App />
// this passes app into workoutContex.jsx and lets use make app be able to use context functionality
// to in this case keep track of all the workouts in the database
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </React.StrictMode>
);
