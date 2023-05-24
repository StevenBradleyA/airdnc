import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import "./SpotCard.css";

const SpotCard = ({ spot, index }) => {
  const dispatch = useDispatch();
  const spotRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((spotCards) => {
      spotCards.forEach((card) => {
        if (card.isIntersecting) {
          setTimeout(() => {
            card.target.classList.add("fade-in");
          }, index * 100);
          observer.unobserve(card.target);
        }
      });
    });

    if (spotRef.current) {
      observer.observe(spotRef.current);
    }

    return () => {
      if (spotRef.current) {
        observer.unobserve(spotRef.current);
      }
    };
  }, [index]);

  const history = useHistory();
  const handleCardClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };

  return (
    <div className="spotCard" ref={spotRef}>
      <div onClick={handleCardClick} className="spot-card-container">
        <div className="preview-container">
          <img
            src={`${spot.previewImage}`}
            alt={`${spot.name}`}
            className="previewImage"
            // data-tooltip-id="my-tooltip"
            // data-tooltip-content={spot.name}
          />
          {/* <Tooltip id="my-tooltip" place="bottom" delayShow="200"  /> */}
          {/* noArrow="true" */}
        </div>

        <div className="home-text-container">
          <div className="location-rating-container">
            <div className="location">{`${spot.city}, ${spot.state} `}</div>
            <div className="avg-rating-container">
              <FontAwesomeIcon icon={faStar} className="home-star" />
              <div className="home-rating-text">
                {spot.avgRating === "NaN" ? "New" : spot.avgRating}
              </div>
            </div>
          </div>
          <div className="home-country-container">
            {`Stay in ${
              spot.country === "United States"
                ? "the United States"
                : spot.country
            }!`}
          </div>

          <div className="price-container">
            <div className="price">{`$${spot.price}`}</div>
            <div className="night">night</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
