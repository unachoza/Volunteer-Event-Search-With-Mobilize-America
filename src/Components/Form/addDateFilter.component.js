import React from 'react';

const date_options = ['me','her', 'them', 'ellos']
const AddDateFilter = ({ handleEventFilters, doneAddingEvents }) => {
  return (
    <div>
    <form className="form">
     <div>anything else related to choosing dates not types</div>
         {date_options.map((option, i) => (
          <div key={i} className="event-type__option">
            <input type="checkbox" id={option} name={option} value={option} hidden onClick={handleEventFilters} />
            <label for={option} value={option}>
              {option}
            </label>
          </div>
        ))}
        <span style={{ display: 'flex', margin: '0px auto' }}>
          <button onClick={(event) => doneAddingEvents(event)}>submit</button>
        </span> 
      </form>
    </div>
  );
};

export default AddDateFilter;
