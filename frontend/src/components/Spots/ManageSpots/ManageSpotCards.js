import "./ManageSpots.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteSpotFormModal from "../DeleteSpot";
import OpenModalButton from "../../OpenModalButton";
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

  return (
    <div>
      <div  onClick={handleCardClick} className="spotCard">
        <img
          src={`${spot.previewImage}`}
          alt={`${spot.name}`}
          className="previewImage"
        ></img>
        <h2 className="location">{`${spot.city}, ${spot.state} `}</h2>
        {/* <h2>{spot.state} </h2> */}
        <h2 className="avg-rating">{spot.avgRating}</h2>
        <h2 className="price">{`$${spot.price} night`}</h2>
        {/* Going to need the spot name on a hover css */}
      </div>
      <button onClick={handleUpdateClick}>Update</button>
      <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteSpotFormModal spot={spot} />}
      />
    </div>
  );
};

export default ManageSpotCard;
