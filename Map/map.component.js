import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import 'Components/Map/map.styles.css';
import EventsContext from 'Context/event.context';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const EventMarker = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const divStyle = {
    background: `white`,
    color: '#004ac7',
    height: '100%',
    marginLeft: '10px',
    fontSize: '15px',
    fontWeight: '600',
    alignBottom: true,
    pane: 'mapPane',
  };

  return (
    <EventsContext.Consumer>
      {(fetchedEvents) => (
          <div>
            {fetchedEvents
              .filter((event) => event.coordinates.lat)
              .map((event, i) => (
                <Marker
                  key={i}
                  defaultAnimation={Animation.bounce}
                  onClick={() => setSelectedMarker(event)}
                  markers={event.title}
                  position={{
                    lat: event.coordinates.lat,
                    lng: event.coordinates.lng,
                  }}
                />
              ))}
            {selectedMarker && (
              <InfoWindow
                position={{
                  lat: selectedMarker.coordinates.lat,
                  lng: selectedMarker.coordinates.lng,
                }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div style={divStyle}>
                  <p>
                    <a
                      href={selectedMarker.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: '#004ac7' }}
                    >
                      {selectedMarker.title}
                    </a>
                  </p>
                  <p>{selectedMarker.eventType}</p>
                </div>
              </InfoWindow>
            )}
          </div>
        )
      }
    </EventsContext.Consumer>
  );
};

const Map = () => {
  const locateMapCenter = (
    fetchedEvents,
    center = {
      lat: 40.7282702,
      lng: -73.9506774,
    }
  ) => {
    if (fetchedEvents) center = fetchedEvents.find((event) => event.coordinates.lat);
    return center.coordinates;
  };
  return (
    <div className="map-container">
      <LoadScript id="script-loader" googleMapsApiKey={API_KEY}>
        <EventsContext.Consumer>
          {(fetchedEvents) => (
            <GoogleMap
              id="circle-example"
              mapContainerStyle={{
                height: '60vh',
                width: '60vw',
                overflow: 'hidden',
                borderRadius: '20px',
                border: 'solid #0d0a92 2px',
                boxShadow: '0 1rem 2rem rgba(0,0,0,.8)',
              }}
              zoom={12}
              center={locateMapCenter(fetchedEvents)}
            >
              <EventMarker />
            </GoogleMap>
          )}
        </EventsContext.Consumer>
      </LoadScript>
    </div>
  );
};

export default React.memo(Map);
