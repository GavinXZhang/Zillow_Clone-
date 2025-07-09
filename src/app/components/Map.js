"use client";
import {useState, useCallback, memo} from 'react';
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';

const Map= ({locations}) => {
    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    console.log("locations", locations);
    const center = {
        lat: locations[0]?.latitude, // Example latitude
        lng: locations[0]?.longitude // Example longitude
    };

    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY
    });
    const [map, setmap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        map.setZoom(7)
        setmap(map);
    }, []);
    const onUnmount = useCallback(function callback(map) {
        setmap(null);
    }, []); 
    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {locations.map((location, _index) => (
                    <Marker
                        key={_index}
                        position={{lat: location.latitude, lng: location.longitude}}
                        icon={{
                            url: image,
                            anchor: new window.google.maps.Point(5, 58),
                        }}
                    />
                ))}
            </GoogleMap>
        ) : <></>


    )}
    export default memo(Map);