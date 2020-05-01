import React from 'react';
import { EVENT_TYPES } from '../../Constants/constants';

const formatEventTypes = (event) => event.replace(new RegExp('_', 'g'), ' ').toLowerCase();

const AddEventFilter = ({ handleEventFilters, doneAddingEvents }) => {
  return (
    <form className="form__event-filters">
      {EVENT_TYPES.map((event, i) => (
        <div key={i} className="event-type__option">
          <input type="checkbox" id={event} name={event} value={event} hidden onClick={handleEventFilters} />
          <label for={event} value={event} id="checkbox-option">
            {formatEventTypes(event)}
          </label>
        </div>
      ))}
      <span style={{ display: 'flex', margin: '0px auto' }}>
        {/* <button onClick={(event) => doneAddingEvents(event)}>submit</button> */}
      </span>
    </form>
  );
};

export default AddEventFilter;
