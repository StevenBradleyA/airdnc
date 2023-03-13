import "./SpotCard.css";
const SpotCard = ({ spot }) => {
  return (
    <div key={spot.id} className="spotCard">
      <img
        src={`${spot.previewImage}`}
        alt={`${spot.name}`}
        className="previewImage"
      ></img>
      <div>
        <h2>{spot.city} </h2>
        <h2>{spot.state} </h2>
        <h2>{spot.avgRating}</h2>
      </div>
      <h2>{`$${spot.price} night`}</h2>
      {/* Going to need the spot name on a hover css */}
    </div>
  );
};

export default SpotCard;
