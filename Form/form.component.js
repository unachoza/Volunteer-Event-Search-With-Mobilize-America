import React, { useState } from 'react';
import AddEventFilter from 'Components/Form/addEventFilter.component';
import 'Components/Form/form.styles.css';

const Form = (props) => {
  const [query, setQuery] = useState('');
  const [eventTypeQuery, setEventTypeQuery] = useState([]);
  const [addEventTypesVisible, setAddEventTypesVisible] = useState(false);

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

  return (
    <div className="form-container">
      <form className="zip-input">
        <input
          className="zip-input"
          placeholder="enter zip code"
          type="text"
          name="zipcode"
          onBlur={(e) => setQuery(e.target.value)}
        />
        {!addEventTypesVisible && (
          <button onClick={handleZipcodeQuery} className="zipcode">
            Search
          </button>
        )}
         {!addEventTypesVisible && <button className="zipcode" onClick={(e) => setAddEventTypesVisible(true)}>Add Filters</button>}
      </form>
      {addEventTypesVisible && <AddEventFilter handleEventFilters={handleEventFilters} doneAddingEvents={doneAddingEvents} />}
    </div>
  );
};

export default Form;
