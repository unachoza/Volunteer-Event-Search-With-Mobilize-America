import React, { useState } from 'react';
import AddEventFilter from './addEventFilter.component';
import AddDateFilter from './addDateFilter.component'
import './form.styles.css';

const Form = (props) => {
  const [query, setQuery] = useState('');
  const [eventTypeQuery, setEventTypeQuery] = useState([]);
  const [addEventTypesVisible, setAddEventTypesVisible] = useState(false);
   const [choosDateVisible, setChoosDateVisible] = useState(false);

  const handleZipcodeQuery = (event) => {
    event.preventDefault();
    props.oldUpdateRequestUrl(query);
  };

  const clearCheckboxesFromForm = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));
  };

  const handleEventFilters = (event) => {
    const { value } = event.target;
    setEventTypeQuery([...eventTypeQuery, value]);
  };

  const doneAddingEvents = (event) => {
    event.preventDefault();
    const moreInputs =
      eventTypeQuery.length > 1
        ? eventTypeQuery.map((type) => '&event_types=' + type).join('')
        : '&event_types=' + eventTypeQuery;
    props.oldUpdateRequestUrl(query, moreInputs);
    clearCheckboxesFromForm();
    setEventTypeQuery([]);
    return moreInputs;
  };
  const keyPressed = (event) => {
    setQuery(query + event.key);
    if (event.key === 'Enter') {
      handleZipcodeQuery(event);
    }
  };

  return (
    <div className="form__container">
      <form className="form__zip-input">
        <input
          className="form__zip-input"
          placeholder="enter zip code"
          type="text"
          name="zipcode"
          onKeyPress={keyPressed}
          onBlur={(e) => setQuery(e.target.value)}
        />
        {!addEventTypesVisible && (
          <button onClick={handleZipcodeQuery} onKeyPress={keyPressed} className="zipcode">
            Search
          </button>
        )}
        {!addEventTypesVisible && (
          <button className="zipcode" onClick={(e) => setAddEventTypesVisible(true)}>
            Add Filters
          </button>
        )}
        {/* {!choosDateVisible && (
          <button className="zipcode" onClick={(e) => setChoosDateVisible(true)}>
            Choose Date
          </button>
        )} */}
      </form>
      {addEventTypesVisible && (
        <AddEventFilter handleEventFilters={handleEventFilters} doneAddingEvents={doneAddingEvents} />
      )}
        {choosDateVisible && (
        <AddDateFilter handleEventFilters={handleEventFilters} doneAddingEvents={doneAddingEvents} />
      )}
    </div>
  );
};

export default Form;
