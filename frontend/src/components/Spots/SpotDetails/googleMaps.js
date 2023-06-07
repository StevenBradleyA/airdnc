import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const GoogleMaps = ({ currentSpot, mapsSecret }) => {
  const [map, setMap] = useState(null);

  // const [newCenter, setNewCenter] = useState({
  //   lat: 47.6062,
  //   lng: -122.3321,
  // });

  const [newCenter, setNewCenter] = useState({
    lat: Number(currentSpot.lat),
    lng: Number(currentSpot.lng),
  });

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapsSecret,
  });

  const containerStyle = {
    width: "100%",
    height: "450px",
    marginBottom: "20px",
  };


  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (
      currentSpot &&
      typeof currentSpot.lat === "number" &&
      typeof currentSpot.lng === "number"
    ) {
      setNewCenter({
        lat: currentSpot.lat,
        lng: currentSpot.lng,
      });
    }
  }, [currentSpot]);

  useEffect(() => {
    if (map) {
      if (typeof window.google !== "undefined" && window.google.maps) {
        const bounds = new window.google.maps.LatLngBounds(newCenter);
        if (map.fitBounds) {
          map.fitBounds(bounds);
        } else {
          console.error("fitBounds function not available");
        }
      } else {
        console.error("Google Maps API not loaded");
      }
    }
  }, [newCenter, map]);


  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  console.log("uhhhhhh helllloooo", newCenter)
  console.log('lat', currentSpot.lat)
  console.log('lng', currentSpot.lng)


  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={newCenter}
          zoom={3}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
};

export default GoogleMaps;
