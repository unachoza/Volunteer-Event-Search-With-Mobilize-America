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




export const useEventsFetch = (pageNumber, requestUrl) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  useEffect(
    (nextPage, fetchedEvents) => {
      setNextPage(null);
      setFetchedEvents([]);
    },
    [requestUrl]
  );
  
  const paramsObj = {
      page: pageNumber,
     per_page: DEFAULT_PER_PAGE,
      zipcode: DEFAULT_ZIPCODE,
      timeslot_start: EVENTS_IN_2020,
      is_virtual: false,
      // event_types : [],
    }

  useEffect(() => {
    const fetchingFromAPI = async () => {
      try {
        let data;
        // if (pageNumber > 1) data = await axios.get(nextPage);
        // else if (requestUrl) data = await axios.get(requestUrl);
        // else data = await axios.get(MOBILZE_BASE_URL + '&zipcode=' + DEFAULT_ZIPCODE)
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
console.log(data)
        setHasMore(data.data.count > 0);
        setNextPage(data.data.next);
        setLoading(false);
      } catch (e) {
        console.log('this is the error', e, 'but also');
        setError(true);
      }
    };
    fetchingFromAPI();
  }, [pageNumber, requestUrl]);

  return { loading, error, fetchedEvents, hasMore };
};
