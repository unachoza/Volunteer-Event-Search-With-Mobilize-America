import React, { useState, useRef, useCallback } from 'react';
import Map from './Map/map.component';
import Form from './Form/form.component';
import EventList from './EventList/eventList.component';
import Header from './Header/header.component';
import { useEventsFetch } from '../API/MobilizeFetch';
import EventsContext from '../Context/event.context';
import './App.css';
import LoadingSpinner from './loadingSpinner/loadingSpinner.component';
import {
  MOBILZE_BASE_URL,
  DEFAULT_ZIPCODE,
  CURRENT_EVENTS,
  DEFAULT_PER_PAGE,
  EVENTS_IN_2020,
} from '../Constants/constants';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [zipcode, setZipcode] = useState(DEFAULT_ZIPCODE);
  const [dataRange, setDateRange] = useState(CURRENT_EVENTS);
  const [isVirtual, setIsVirtual] = useState(false);

  //infinite scroll
  const observer = useRef();
  console.log(isVirtual);
  const { loading, error, fetchedEvents, hasMore } = useEventsFetch(pageNumber, zipcode, dataRange, isVirtual);

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

  const updateZipcode = (input) => setZipcode(input);

  const updateDateRange = (input) => setDateRange
    (input ? EVENTS_IN_2020 : CURRENT_EVENTS);

  const updateIsVirtual = (input) => setIsVirtual(input);

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
              <Form updateZipcode={updateZipcode} updateDateRange={updateDateRange} updateIsVirtual={updateIsVirtual} />
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
