import React, { useState } from 'react';
import EventTagFooter from '../EventTag/eventTag.component';
import './event.styles.css';

const Event = ({event}) => {
  console.log(event)
  const [displayDetails, setDisplayDetails] = useState(false);

  const getDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp * 1000).toLocaleString();
    return dateObject.replace(':00', '');
  };
  const toggleDisplayDetails = () => {
    setDisplayDetails(!displayDetails);
  };
  
  
  if (event.length < 1) {
  
  }
  const { title, details, eventDate } = event;
  return (
    <div className="event-card" onClick={toggleDisplayDetails}>
      
      <div className="event-card__date">{getDate(eventDate.start)} </div>
      <div className="event-card__title" onClick={toggleDisplayDetails}>
        {title.toUpperCase()}
      </div>
      {displayDetails ? <div className="event-card__description">{details}</div> : null}
      <EventTagFooter eventTags={event} />
    </div>
  );
};

export default Event;
