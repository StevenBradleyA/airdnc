import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./CreateReview.css"
const StarsRatingInput = ({ stars, disabled, handleSetRating }) => {
  const [currentStarRating, setCurrentStarRating] = useState(stars);

  useEffect(() => {
    setCurrentStarRating(stars);
  }, [stars]);
 
  const starsIcon = (number) => {
    const stars = {};
    if (!disabled) {
      stars.onMouseEnter = () => setCurrentStarRating(number);
      stars.onMouseLeave = () => setCurrentStarRating(stars);
      stars.onClick = () => handleSetRating(number);
    }
    return (
      <div key={number} className={currentStarRating >= number ? "filled" : "empty"} {...stars}>
        <FontAwesomeIcon icon={faStar} />
      </div>
    );
  };

  return (
    <div className='five-stars'>
      {[1, 2, 3, 4, 5].map(number => starsIcon(number))}
    </div>
  );
};

export default StarsRatingInput;
