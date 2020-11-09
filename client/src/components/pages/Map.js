import React, { useRef, useEffect } from 'react';
import {Map, TileLayer, Marker, Popup, ZoomControl} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { makeStyles } from '@material-ui/core';
import './Map.css';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const useStyles = makeStyles((theme) => ({
    leafletContainer: {
        width: '100vh',
        height: '100vh',
    },
}));

const someLocation = [19.07370, 72.912370];

const Maps = () => {
    const classes = useStyles();
    const mapRef = useRef();
    useEffect(() => {
        const { current={} } = mapRef;
        //console.log(`current: ${current}`)
        const { leafletElement: map } = current;
        //console.log(map);
        setTimeout(() => {
            map.flyTo(someLocation, 14, {
                duration: 2
            })
        }, 1000);
    }, [mapRef]
    )
  // create map
  const position = [19.07370, 72.912370]
  console.log(mapRef);

    return (
     <div>
         <Map center={position} zoom={12} ref={mapRef} zoomControl={false}>
             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  
             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
             <ZoomControl position="bottomright" />
             <Marker position={position}>
                 <Popup>
                     Pick Up
                 </Popup>
             </Marker>
         </Map>
     </div>
);
}

export default Maps;