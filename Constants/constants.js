export const DEFAULT_PER_PAGE = 'per_page=12';
export const DEFAULT_ZIPCODE = 10001;
export const EVENTS_IN_2020 = 'timeslot_start=gte_1577836800';
export const CURRENT_EVENTS = 'timeslot_start=gte_now';
export const DATE_FILTER = {
  APRIL_2020: 'timeslot_start=gte_1585699200& timeslot_start=lt_1588204800',
  MAY_2020: 'timeslot_start=gte_1588291200& timeslot_start=lt_1590883200',
};
export const EVENT_TYPES = [
  'canvass',
  'phone_bank ',
  'fundraiser',
  'voter_reg',
  'training',
  'debate_watch_party',
  'town_hall',
  'barnstorm',
  'signature_gathering',
];

export const MOBILZE_BASE_URL = `https://api.mobilize.us/v1/events?${DEFAULT_PER_PAGE}&${EVENTS_IN_2020}`;
