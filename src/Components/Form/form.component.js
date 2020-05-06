import React, { useState } from 'react';
import AddEventFilter from './addEventFilter.component';
import './form.styles.css';
import FilterButton from './filterButton.component';
import FormInput from './formInput.component';

const Form = (props) => {
  const [query, setQuery] = useState('');
  const [eventTypeQuery, setEventTypeQuery] = useState([]);
  const [eventTypesActive, setEventTypesActive] = useState(false);
  const [dateFilterActive, setDateFilterActive] = useState(false);
  const [virtualFilterActive, setVirtualFilterActive] = useState(false);
  const [includePast, setIncludePast] = useState(false);

  const getFilterButtonClassName = (isActive) => (isActive ? 'active-category' : 'filter-button');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateZipcode(query);
    props.updateDateRange(includePast);
    props.updateIsVirtual(virtualFilterActive);
    clearCheckboxesFromForm();
  };

  const clearCheckboxesFromForm = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));
  };

  const handleEventFilters = (event) => {
    const { value } = event.target;
    setEventTypeQuery([...eventTypeQuery, value]);
    console.log(eventTypeQuery);
  };

  const doneAddingEvents = (event) => {
    event.preventDefault();
    props.updateEventFilters(eventTypeQuery);
    clearCheckboxesFromForm();
    setEventTypeQuery([]);
    console.log('done adding events function')
  };
  const keyPressed = (event) => {
    setQuery(query + event.key);
    if (event.key === 'Enter') {
      props.updateZipcode(event);
    }
  };
  const activeDateFilter = () => {
    console.log('working');
    setDateFilterActive(!dateFilterActive);
    setIncludePast(!includePast);
  };
  const activateVirualFilter = () => {
    setVirtualFilterActive(!virtualFilterActive);
  };

  return (
    <div className="form__container">
      <form>
        <div className="form__zip-input-container">
          <div className="form__zip-input" style={{ height: '63px' }}>
            <label for="zipcode" className="required-field">
              Enter zip code
            </label>
            <FormInput
              id="zipcode-input"
              style={{ height: '40px' }}
              type="text"
              name="zipcode"
              onKeyPress={keyPressed}
              onBlur={(e) => setQuery(e.target.value)}
            ></FormInput>
          </div>
          <div>
            <FilterButton onClick={handleSubmit} onKeyPress={keyPressed} id="search-button">
              Search
            </FilterButton>
          </div>
        </div>
        <div className="form__optional-filters">
          <label>Optional Filters</label>
          <div style={{ margin: '-20px 0px 0px -21px' }}>
            <FilterButton
              type="button"
              className={getFilterButtonClassName(eventTypesActive)}
              onClick={() => setEventTypesActive(!eventTypesActive)}
            >
              Add Event Filters
            </FilterButton>
            <FilterButton
              type="button"
              className={getFilterButtonClassName(dateFilterActive)}
              onClick={() => activeDateFilter()}
            >
              Add Past Events
            </FilterButton>
            <FilterButton
              type="button"
              className={getFilterButtonClassName(virtualFilterActive)}
              onClick={() => activateVirualFilter()}
            >
              Virtual Events
            </FilterButton>
          </div>
        </div>
      </form>
      {eventTypesActive && (
        <AddEventFilter handleEventFilters={handleEventFilters} doneAddingEvents={doneAddingEvents} />
      )}
    </div>
  );
};

export default Form;
