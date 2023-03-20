import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./CreateReview.css";
const StarsRatingInput = ({ stars, disabled, onChange }) => {
  const [currentStarRating, setCurrentStarRating] = useState(stars);

  useEffect(() => {
    setCurrentStarRating(stars);
  }, [stars]);

  const starsIcon = (number) => {
    const starsObj = {};
    if (!disabled) {
      starsObj.onMouseEnter = () => setCurrentStarRating(number);
      starsObj.onMouseLeave = () => setCurrentStarRating(stars);
      starsObj.onClick = () => onChange(number);
    }
    return (
      <div
        key={number}
        className={currentStarRating >= number ? "filled" : "empty"}
        {...starsObj}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
    );
  };

  return (
    <div className="five-stars">
      {[1, 2, 3, 4, 5].map((number) => starsIcon(number))}
    </div>
  );
};

export default StarsRatingInput;
