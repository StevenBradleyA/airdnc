import "./ManageSpots.css";
import { useHistory } from "react-router-dom";
import DeleteSpotFormModal from "../DeleteSpot";
import OpenModalButton from "../../OpenModalButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ManageSpotCard = ({ spot }) => {
  const history = useHistory();

  const handleCardClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };
  const handleUpdateClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}/edit`);
  };
  console.log("hello there old boy", spot);
  return (
    <div className="manage-spot-card-container">
      <div onClick={handleCardClick}>
        <img
          src={`${spot.previewImage}`}
          alt={`${spot.name}`}
          className="manage-preview-image"
        ></img>
        <div className="location-rating-container">
          <h2 className="location">{`${spot.city}, ${spot.state} `}</h2>
          {/* <h2>{spot.state} </h2> */}
          <h2 className="avg-rating">
            <FontAwesomeIcon icon={faStar} />
            {spot.avgRating === "NaN" ? "New" : spot.avgRating}
          </h2>
        </div>
        {/* <h2 className="price">{`$${spot.price} night`}</h2> */}
        <div className="manage-price-container">
          <h1 className="manage-price-card">{`$${spot.price}`}</h1>
          <h1 className="manage-night-card">night</h1>
        </div>
      </div>
      <button className="manage-update-button" onClick={handleUpdateClick}>Update</button>
      <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteSpotFormModal spot={spot} />}
      />
    </div>
  );
};

export default ManageSpotCard;
