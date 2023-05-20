import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function FilterModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("");
  const { closeModal } = useModal();

  const handleShowSpotsClick = (e) => {
    e.preventDefault();
    history.push(`/`);
    closeModal();
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    //   const reviewInformation = {
    //     review,
    //     stars,
    //   };

    //   dispatch(createReviewThunk(reviewInformation, spotId))
    //     .then(() => closeModal())
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors({ review: data.errors[0] });
    //     });

    //   closeModal();
  };

  //
  // we need to create a new store that tracks filtered results....
  // lets show the total number of results
  // if zero don't let them filter

  return (
    <div className="filter-modal-container">
      <div>Price range</div>
      <form onSubmit={handleFilterSubmit} className="filter-modal-form-container" >
        <input
          type="text"
          value={minPrice}
          //   className="leave-review"
          placeholder="Minimum"
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="text"
          value={maxPrice}
          //   className="leave-review"
          placeholder="Maximum"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        {/* lets just make a set of cards like airbnb */}
        <input
          type="text"
          value={country}
          //   className="leave-review"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />

        {country === "United States" && (
          <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select a state</option>
          <option value="Alabama">Alabama</option>
          <option value="Alaska">Alaska</option>
          <option value="Arizona">Arizona</option>
          <option value="Arkansas">Arkansas</option>
          <option value="California">California</option>
          <option value="Colorado">Colorado</option>
          <option value="Connecticut">Connecticut</option>
          <option value="Delaware">Delaware</option>
          <option value="Florida">Florida</option>
          <option value="Georgia">Georgia</option>
          <option value="Hawaii">Hawaii</option>
          <option value="Idaho">Idaho</option>
          <option value="Illinois">Illinois</option>
          <option value="Indiana">Indiana</option>
          <option value="Iowa">Iowa</option>
          <option value="Kansas">Kansas</option>
          <option value="Kentucky">Kentucky</option>
          <option value="Louisiana">Louisiana</option>
          <option value="Maine">Maine</option>
          <option value="Maryland">Maryland</option>
          <option value="Massachusetts">Massachusetts</option>
          <option value="Michigan">Michigan</option>
          <option value="Minnesota">Minnesota</option>
          <option value="Mississippi">Mississippi</option>
          <option value="Missouri">Missouri</option>
          <option value="Montana">Montana</option>
          <option value="Nebraska">Nebraska</option>
          <option value="Nevada">Nevada</option>
          <option value="New Hampshire">New Hampshire</option>
          <option value="New Jersey">New Jersey</option>
          <option value="New Mexico">New Mexico</option>
          <option value="New York">New York</option>
          <option value="North Carolina">North Carolina</option>
          <option value="North Dakota">North Dakota</option>
          <option value="Ohio">Ohio</option>
          <option value="Oklahoma">Oklahoma</option>
          <option value="Oregon">Oregon</option>
          <option value="Pennsylvania">Pennsylvania</option>
          <option value="Rhode Island">Rhode Island</option>
          <option value="South Carolina">South Carolina</option>
          <option value="South Dakota">South Dakota</option>
          <option value="Tennessee">Tennessee</option>
          <option value="Texas">Texas</option>
          <option value="Utah">Utah</option>
          <option value="Vermont">Vermont</option>
          <option value="Virginia">Virginia</option>
          <option value="Washington">Washington</option>
          <option value="West Virginia">West Virginia</option>
          <option value="Wisconsin">Wisconsin</option>
          <option value="Wyoming">Wyoming</option>
        </select>
        )}

        <input
          type="submit"
          //   className="submit-review-button-modal"
          value="Submit Your Review"
          //   disabled={}
        />
      </form>

      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default FilterModal;
