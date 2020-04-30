import React, { useState, useRef, useCallback } from 'react';
import Map from './Map/map.component';
import Form from './Form/form.component';
import EventList from './EventList/eventList.component';
import Header from './Header/header.component';
import { useEventsFetch } from '../API/MobilizeFetch';
import EventsContext from '../Context/event.context';
import './App.css';
import LoadingSpinner from './loadingSpinner/loadingSpinner.component';
import { MOBILZE_BASE_URL } from '../Constants/constants';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [requestUrl, setRequestUrl] = useState(null);

  //infinite scroll
  const observer = useRef();

  const { loading, error, fetchedEvents, hasMore } = useEventsFetch(pageNumber, requestUrl);

  const lastEventElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
        }
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const updateRequestUrl = (input, moreInputs = '') => {
    setRequestUrl(MOBILZE_BASE_URL + '&zipcode=' + input + moreInputs);
    setPageNumber(1);
  };

  return (
    <div>
      <Header />
      <div className="body">
        {loading ? (
          <LoadingSpinner loading={loading} />
        ) : (
          <EventsContext.Provider value={fetchedEvents}>
            <EventList events={fetchedEvents} loading={loading} lastEventElementRef={lastEventElementRef} />
            <div className="main-page">
              <Form updateRequestUrl={updateRequestUrl} />
              {error && <div>ZipCode Not Valid</div>}
              <Map />
            </div>
          </EventsContext.Provider>
        )}
      </div>
    </div>
  );
};
export default App;
