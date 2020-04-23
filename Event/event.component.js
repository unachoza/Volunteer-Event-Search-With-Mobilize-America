import React, { useState } from 'react';
import EventTagFooter from 'Components/EventTag/eventTag.component';
import 'Components/Event/event.styles.css';

const Event = (props) => {
  const [displayDetails, setDisplayDetails] = useState(false);

  const getDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp * 1000).toLocaleString();
    return dateObject.replace(':00', '');
  };
  const toggleDisplayDetails = () => {
    setDisplayDetails(!displayDetails);
  };
  const { title, details, eventDate } = props.event[1];
  return (
    <div className="event-card" onClick={toggleDisplayDetails}>
      <div className="event-card__date">{getDate(eventDate.start)} </div>
      <div className="event-card__title" onClick={toggleDisplayDetails}>
        {title.toUpperCase()}
      </div>
      {displayDetails ? <div className="event-card__description">{details}</div> : null}
      <EventTagFooter eventTags={props.event[1]} />
    </div>
  );
};

export default Event;
