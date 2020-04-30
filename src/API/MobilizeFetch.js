import { useEffect, useState } from 'react';
import axios from 'axios';
import { MOBILZE_BASE_URL, DEFAULT_ZIPCODE } from '../Constants/constants';

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
  eventImg: event.featured_image_url || null,
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

  useEffect(() => {
    console.log(loading, 'started?');
    // const abortController = new AbortController()
    // const signal = abortController.signal
    const fetchingFromAPI = async () => {
      try {
        let data;
        if (pageNumber > 1) data = await axios.get(nextPage);
        else if (requestUrl) data = await axios.get(requestUrl);
        else data = await axios.get(MOBILZE_BASE_URL + '&zipcode=' + DEFAULT_ZIPCODE)
     
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
        console.log(nextPage)
        setLoading(false);
      } catch (e) {
        console.log('this is the error', e.message);
        setError(true);
      }
      // return
      // abortController.abort()
    };
    fetchingFromAPI();
  }, [pageNumber, requestUrl]);
   console.log(loading, 'finished?');

  return { loading, error, fetchedEvents, hasMore };
};
