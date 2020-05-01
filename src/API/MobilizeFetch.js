import { useEffect, useState } from 'react';
import axios from 'axios';
import { MOBILZE_BASE_URL, DEFAULT_ZIPCODE, CURRENT_EVENTS , DEFAULT_PER_PAGE, EVENTS_IN_2020} from '../Constants/constants';

const normalizeEventData = (event) => ({
  id: event.id,
  isVirtual: event.is_virtual,
  showEventDetails: false,
  eventType: event.event_type,
  title: event.title,
  details: event.description,
  zipcode: event.location?.postal_code || null,
  coordinates: {
    lat: event.location?.location?.latitude || null,
    lng: event.location?.location?.longitude || null,
  },
  eventDate: {
    start: event.timeslots[event.timeslots.length - 1]?.start_date || null,
    end_date: event.timeslots[event.timeslots.length - 1]?.end_date || null,
  },
  link: event.browser_url || null,
});




export const useEventsFetch = (pageNumber, zipcode, dataRange, isVirtual) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [hasMore, setHasMore] = useState(false);
console.log(dataRange)
  useEffect(
    (nextPage, fetchedEvents) => {
      setFetchedEvents([]);
    },
    [zipcode, dataRange, isVirtual]
  );
  const paramsObj = {
      page: pageNumber,
      per_page: DEFAULT_PER_PAGE,
      zipcode: zipcode,
      timeslot_start: dataRange,
      is_virtual: isVirtual,
      // event_types : [],
    }
console.log(isVirtual)
  useEffect(() => {
    const fetchingFromAPI = async () => {
      try {
        let data;
        if(isVirtual === true) data  = await axios.get(MOBILZE_BASE_URL + new URLSearchParams(paramsObj).delete(zipcode))
     data = await axios.get(MOBILZE_BASE_URL + new URLSearchParams(paramsObj))
        setFetchedEvents((prevEvents) => {
          return [
            ...new Set([
              ...prevEvents,
              ...data.data.data
                // .filter((event) => event.is_virtual)
                .map((event) => normalizeEventData(event)),
            ]),
          ];
        });
        setHasMore(data.data.count > 0);
        setLoading(false);
        console.log(data)
        
      } catch (e) {
        console.log('this is the error', e, 'but also');
        setError(true);
      }
    };
    fetchingFromAPI();
  }, [pageNumber, zipcode, dataRange]);

  return { loading, error, fetchedEvents, hasMore };
};
