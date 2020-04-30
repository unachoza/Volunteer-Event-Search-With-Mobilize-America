import React, { useState } from 'react';
import AddEventFilter from './addEventFilter.component';
import AddDateFilter from './addDateFilter.component';
import './form.styles.css';
import FilterButton from './filterButton.component';
import FormInput from './formInput.component';

// function isValidUSZip(sZip) {
//    return /^\d{5}(-\d{4})?$/.test(sZip);
// }

const Form = (props) => {
  const [query, setQuery] = useState('');
  const [eventTypeQuery, setEventTypeQuery] = useState([]);
  const [eventTypesActive, setEventTypesActive] = useState(false);
  const [dateFilterActive, setDateFilterActive] = useState(false);
  const [virtualFilterActive, setVirtualFilterActive] = useState(false);
  // const [addEventTypesVisible, setAddEventTypesVisible] = useState(false);
  // const [choosDateVisible, setChoosDateVisible] = useState(false);
  //  const [chooseVirtualEvemts, setChooseVirtualEvemts] = useState(false);

  const getButtonClassName = (isActive) => (isActive ? 'active-category' : 'zipcode');

  const handleZipcodeQuery = (event) => {
    event.preventDefault();
    props.updateRequestUrl(query);
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
    props.updateRequestUrl(query, moreInputs);
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
        <div className="form__main">
          <FormInput
            className="form__zip-input"
            placeholder="enter zip code"
            type="text"
            name="zipcode"
            onKeyPress={keyPressed}
            onBlur={(e) => setQuery(e.target.value)}
          ></FormInput>
          <FilterButton onClick={handleZipcodeQuery} onKeyPress={keyPressed} className="zipcode">
            Search
          </FilterButton>
        </div>
        <fieldset>
          <legend>Optional Filters</legend>
          <FilterButton
            type="button"
            className={getButtonClassName(eventTypesActive)}
            onClick={() => setEventTypesActive(!eventTypesActive)}
          >
            Add Event Filters
          </FilterButton>
          <FilterButton
            type="button"
            className={getButtonClassName(dateFilterActive)}
            onClick={() => setDateFilterActive(!dateFilterActive)}
          >
            Include Past Events
          </FilterButton>
          <FilterButton
            type="button"
            className={getButtonClassName(virtualFilterActive)}
            onClick={() => setVirtualFilterActive(!virtualFilterActive)}
          >
            Virtual Events Only
          </FilterButton>
        </fieldset>
      </form>
      {eventTypesActive && (
        <AddEventFilter handleEventFilters={handleEventFilters} doneAddingEvents={doneAddingEvents} />
      )}
      {dateFilterActive && (
        <AddDateFilter handleEventFilters={handleEventFilters} doneAddingEvents={doneAddingEvents} />
      )}
    </div>
  );
};

export default Form;
