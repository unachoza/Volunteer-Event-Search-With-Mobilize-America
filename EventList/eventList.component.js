import React from 'react';
import Event from 'Components/Event/event.component';
import 'Components/EventList/eventList.styles.css';
import LoadingSpinner from 'Components/loadingSpinner/loadingSpinner.component';


const EventList = ({ events, lastEventElementRef, loading }) => {
  return (
    <div className="event-list__container">
      {!events.length ? (
        <div className="no-results">
          Oh dear!<br></br> Your search returned no events.
        </div>
      ) :
        (events.length < 2 ? <Event event={events[0]} />
          : Object.entries(events)
            .map((event, i) => (
             (events.length === i + 1) ?
                <div ref={lastEventElementRef} key={i}>{event.title}</div>
                : <Event key={i} event={event} />
            ))
        )
      }
      {loading && <LoadingSpinner loading={loading} />}
    </div>
  );
};

export default EventList;
