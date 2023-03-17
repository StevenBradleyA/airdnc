import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./CreateReview.css"
const StarsRatingInput = ({ rating, disabled, onChange }) => {
  const [activeRating, setActiveRating] = useState(rating);

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);
 
  const starsIcon = (number) => {
    const stars = {};
    if (!disabled) {
      stars.onMouseEnter = () => setActiveRating(number);
      stars.onMouseLeave = () => setActiveRating(rating);
      stars.onClick = () => onChange(number);
    }
    return (
      <div key={number} className={activeRating >= number ? "filled" : "empty"} {...stars}>
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
