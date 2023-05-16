import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../../store/spots";
import { useParams } from "react-router-dom";
import AllReviews from "../../Reviews/AllReviews/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { loadSpots } from "../../../store/spots";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import "./SpotDetails.css";
const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const reserveButtonRef = useRef(null);
  const [map, setMap] = useState(null);
  const mapsSecret = process.env.REACT_APP_MAPS_API;


  //  -------      maps      ---------
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapsSecret,
  });

  const containerStyle = {
    width: '100%',
    height: '450px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };



  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])




//  -------          - -----------


  const handleMouseMove = (e) => {
    const button = reserveButtonRef.current;
    const outline = button.getBoundingClientRect();
    const x = e.clientX - outline.left;
    const y = e.clientY - outline.top;
    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  };

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
  }, [dispatch, spotId]);

  const allSpots = useSelector((state) => state.spots);

  // Updating the store to keep track of review changes
  const allReviews = useSelector((state) => Object.values(state.reviews));

  const currentReviews = allReviews
    .filter((e) => Number(spotId) === e.spotId)
    .sort((a, b) => b.id - a.id);

  useEffect(() => {
    dispatch(loadSpots(updateReviewAverage()));
  }, [currentReviews.length]);

  const updateReviewAverage = () => {
    const totalScore = currentReviews.reduce((sumReview, currentReview) => {
      sumReview += currentReview.stars;
      return sumReview;
    }, 0);
    const numReviews = currentReviews.length;
    const avgStarRating = `${(totalScore / numReviews).toFixed(1)}`;

    const updatedSpot = {
      [spotId]: { ...currentSpot, totalScore, avgStarRating },
    };

    return updatedSpot;
  };
  // --------------------

  const currentSpot = allSpots[spotId];
  if (!currentSpot) {
    return <h1>LOADING...</h1>;
  }

  let previewArr;
  let otherImagesArr;
  if (currentSpot.Owner && currentSpot.SpotImages) {
    previewArr = currentSpot.SpotImages.filter((e) => e.preview === true);
    otherImagesArr = currentSpot.SpotImages.filter((e) => e.preview === false);
  }

  return (
    <div className="spot-detail-container">
      <div className="spot-name">{currentSpot.name}</div>
      <div className="details-header-container">
        {currentSpot.numReviews === 0 && (
          <div className="details-header-new">
            <FontAwesomeIcon icon={faStar} id="details-heading-star" />
            {` New `}
          </div>
        )}
        {currentSpot.numReviews >= 1 && (
          <div className="details-header-reviews">
            <FontAwesomeIcon icon={faStar} id="details-heading-star" />
            {` ${currentSpot.avgStarRating} ·  `}
            <span className="details-num-reviews">
              {`${currentReviews.length} review${
                currentReviews.length === 1 ? "" : "s"
              }`}
            </span>
          </div>
        )}
        <div className="spot-location">{`·  ${currentSpot.state}, ${currentSpot.country}`}</div>
      </div>
      {currentSpot.Owner &&
        currentSpot.SpotImages &&
        previewArr.length &&
        otherImagesArr.length && (
          <>
            <div className="spot-images-container">
              <div className="detail-preview-container">
                <img
                  className="detail-preview-image"
                  src={previewArr[0].url}
                  alt="preview"
                />
              </div>
              <div className="detail-images-container">
                <img
                  className="detail-image-one"
                  src={otherImagesArr[0].url}
                  alt="preview"
                />
                <img
                  className="detail-image-two"
                  src={otherImagesArr[1].url}
                  alt="preview"
                />
                <img
                  className="detail-image-three"
                  src={otherImagesArr[2].url}
                  alt="preview"
                />
                <img
                  className="detail-image-four"
                  src={otherImagesArr[3].url}
                  alt="preview"
                />
              </div>
            </div>
          </>
        )}
      <div className="detail-title-reserve-container">
        {currentSpot.Owner && currentSpot.SpotImages && (
          <div className="owner-title">{`Crash on a couch hosted by ${currentSpot.Owner.firstName}`}</div>
        )}

        <div className="reserve-container">
          <div className="price-star-container">
            <div className="price-night-container">
              <h1 className="price-reserve">{`$${currentSpot.price}`}</h1>
              <h1 className="reserve-night">night</h1>
            </div>
            <div className="detail-booking-rating-container">
              {currentSpot.numReviews === 0 && (
                <h1 className="reserve-new">
                  <FontAwesomeIcon icon={faStar} />
                  {`New`}
                </h1>
              )}
              {currentSpot.numReviews >= 1 && (
                <h1 className="reserve-rating-number">
                  <FontAwesomeIcon icon={faStar} />{" "}
                  {`${currentSpot.avgStarRating} · ${
                    currentReviews.length
                  } review${currentReviews.length === 1 ? "" : "s"}`}
                </h1>
              )}
            </div>
          </div>
          <button
            className="reserve-button"
            ref={reserveButtonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              reserveButtonRef.current.style.setProperty("--x", "0px");
              reserveButtonRef.current.style.setProperty("--y", "0px");
            }}
            onClick={() => window.alert("Feature Coming Soon!")}
          >
            <span></span>
            Reserve
          </button>
        </div>
      </div>

      {/* Google maps API here */}

      <div className="google-maps-container">
        <div className="google-maps-header">Find your couch</div>
        {isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>}
      </div>

      {/* Big Calendar here */}

      <div className="details-description-container">
        <div className="description-title">{`About this place`}</div>
        <div className="description">{currentSpot.description}</div>
      </div>

      <div className="detail-review-container">
        <div>
          <AllReviews
            spotId={spotId}
            currentSpot={currentSpot}
            currentReviews={currentReviews}
          />
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
