import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../../store/spots";
import { useParams } from "react-router-dom";
import AllReviews from "../../Reviews/AllReviews/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { loadSpots } from "../../../store/spots";
import GoogleMaps from "./googleMaps";
import "./SpotDetails.css";
import CalendarDateRange from "./calendar";
import githubIcon from "../../../media/square-github.svg";
import linkedIn from "../../../media/linkedin.svg";
import mapsLogo from "../../../media/logo-location.svg";
import { getAllBookingsBySpotIdThunk } from "../../../store/booking";
import CreateBookingForm from "../Bookings/CreateBooking";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const allSpots = useSelector((state) => state.spots);
  const currentSpot = allSpots[spotId];
  const allReviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getAllBookingsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

  const allBookings = useSelector((state) => Object.values(state.bookings));

  const currentReviews = allReviews
    .filter((e) => Number(spotId) === e.spotId)
    .sort((a, b) => b.id - a.id);

  useEffect(() => {
    dispatch(loadSpots(updateReviewAverage()));
  }, [dispatch, currentReviews.length]);

  const [mapsSecret, setMapsSecret] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (mapsSecret === null) {
        const response = await fetch("/api/maps");
        const data = await response.json();
        setMapsSecret(data.mapsSecret);
      }
    };

    fetchData();
  }, [mapsSecret]);

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

  if (!currentSpot) {
    return <h1>LOADING...</h1>;
  }
  let previewArr;
  let otherImagesArr;
  if (currentSpot.Owner && currentSpot.SpotImages) {
    previewArr = currentSpot.SpotImages.filter((e) => e.preview === true);
    otherImagesArr = currentSpot.SpotImages.filter((e) => e.preview === false);
  }

  const handleDateRangeSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

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
                  className="detail-image-three"
                  src={otherImagesArr[2].url}
                  alt="preview"
                />
                <img
                  className="detail-image-two"
                  src={otherImagesArr[1].url}
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

      <div className="detail-sticky-container">
        <div className="container-left">
          <div className="detail-title-reserve-container">
            {currentSpot.Owner && currentSpot.SpotImages && (
              <div className="owner-title">{`Crash on a couch hosted by ${currentSpot.Owner.firstName}`}</div>
            )}
          </div>

          <div className="google-maps-container">
            <div className="google-maps-header">
              Find your couch{" "}
              <img alt="logo" src={mapsLogo} className="maps-logo" />
            </div>
            {mapsSecret && (
              <GoogleMaps currentSpot={currentSpot} mapsSecret={mapsSecret} />
            )}
          </div>

          <div className="details-description-container">
            <div className="description-title">{`About this place`}</div>
            <div className="description">{currentSpot.description}</div>
          </div>

          <div className="calendar-date-range-container">
            <div className="calendar-header">Plan your nights</div>
            <CalendarDateRange
              currentSpot={currentSpot}
              allBookings={allBookings}
              onDateRangeSelect={handleDateRangeSelect}
            />
          </div>
        </div>
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
          <CreateBookingForm
            currentSpot={currentSpot}
            spotId={Number(spotId)}
            allBookings={allBookings}
            start={selectedStartDate && selectedStartDate.toDateString()}
            end={selectedEndDate && selectedEndDate.toDateString()}
          />
        </div>
      </div>

      <AllReviews
        spotId={spotId}
        currentSpot={currentSpot}
        currentReviews={currentReviews}
      />
      <div className="footer-container">
        <div className="footer-sticky-container">
          <div className="footer-text">@ 2023 Steven Anderson</div>
          {`·`}
          <img
            alt="github"
            src={githubIcon}
            className="footer-icons"
            onClick={() =>
              window.open("https://github.com/StevenBradleyA", "_blank")
            }
          />
          {`·`}
          <img
            alt="linkedIn"
            src={linkedIn}
            className="footer-icons"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/stevenanderson-dev/",
                "_blank"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
