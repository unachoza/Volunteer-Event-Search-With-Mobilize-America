import React from 'react';
import './eventTag.styles.css';

const EventTagFooter = ({ eventTags: { eventType, eventDate, link } }) => {
  const translateUnixToDateRange = (eventDate) =>
    eventDate.start >= Math.round(new Date().getTime() / 1000) ? 'CURRENT' : 'PASSED';

  const removeUnderscores = (input) => input.replace(new RegExp('_', 'g'), ' ');
  return (
    <div className="tag__container">
      {/* <div className="sub-1"> */}
        <div className="tag" style={{ backgroundColor: '#474747' }}>
          {removeUnderscores(translateUnixToDateRange(eventDate))}
        </div>
      {/* </div> */}

      {/* <div className="sub-2"> */}
        <div className="tag" style={{ backgroundColor: '#004ac7' }}>
          {removeUnderscores(eventType)}
        </div>
        <div className="tag" id="join"style={{ backgroundColor: '#c700ac' }}>
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>
            JOIN EVENT
          </a>
        </div>
      {/* </div> */}
    </div>
  );
};

export default EventTagFooter;
