import React from 'react';
import Event from '../Event/event.component';
import './eventList.styles.css';
import LoadingSpinner from '../loadingSpinner/loadingSpinner.component';

const EventList = ({ events, lastEventElementRef, loading }) => {
  console.log( 'is it loading', loading);
  return (
    <div className="event-list__container">
      {loading && <LoadingSpinner loading={loading} />}
      {!events.length ? (
        <div className="no-results">
          Oh dear!<br></br> Your search returned no events.
        </div>
      ) : events.length === 1 ? (
        <Event event={events[0]} />
      ) : (
        <ul>
          {Object.entries(events).map((event, i) =>
            events.length === i + 1 ? (
              <div ref={lastEventElementRef} key={i}>
                {event.title}
              </div>
            ) : (
              <li>
                <Event key={i} event={event[1]} />
              </li>
            )
          )}
        </ul>
      )}
      {loading && <LoadingSpinner loading={loading} />}
    </div>
  );
};

export default EventList;
