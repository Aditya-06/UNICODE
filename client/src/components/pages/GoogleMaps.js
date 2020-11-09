import React, { useState, useRef, useCallback } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import usePlacesAutocomplete, {
  getGeoCode,
  getLatlng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';
import './GMapStyles.css';

const libraries = ['places'];
const mapContainerStyle = {
  width: '80vw',
  height: '90vh',
};

const center = {
  lat: 19.08163,
  lng: 72.90565,
};

function GoogleMaps() {
  const mapRef = useRef();
  const onLoadMap = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [pickUpMarkers, setPickMarkers] = useState([center]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_GOOGLE_MAPS_API,
    libraries,
  });

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <h3>Select Pick up and Drop Off</h3>
      <Search />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={18}
        center={center}
        onLoad={onLoadMap}
        onClick={(event) => {
          setPickMarkers((current) => [
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            },
          ]);
        }}
      >
        {pickUpMarkers.map((marker) => (
          <Marker position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
}

function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 19.08163, lng: () => 72.90565 },
      radius: 200 * 1000,
    },
  });
  return (
    <div className='search'>
      <Combobox
        onSelect={(address) => {
          console.log(address);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Enter Pick Up Address'
        />
        <ComboboxPopover>
          {status === 'OK' &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default GoogleMaps;
