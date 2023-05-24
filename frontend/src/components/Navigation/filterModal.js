import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./Navigation.css";
import map1 from "../../media/map1.png";
import map2 from "../../media/map2.png";
import map3 from "../../media/map3.png";
import map4 from "../../media/map4.png";
import map5 from "../../media/map5.png";
import map6 from "../../media/map6.png";
import { setMinPrice, setMaxPrice, setCountry, setState } from "../../store/filtered";

function FilterModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [unitedStates, setUnitedStates] = useState(false);
  const [unitedStatesWest, setUnitedStatesWest] = useState(false);
  const [unitedStatesEast, setUnitedStatesEast] = useState(false);
  const [unitedStatesMid, setUnitedStatesMid] = useState(false);
  const [unitedStatesSouth, setUnitedStatesSouth] = useState(false);

  const [minPrice, setMinPriceLocal] = useState("");
  const [maxPrice, setMaxPriceLocal] = useState("");
  const [country, setCountryLocal] = useState("");
  const [state, setStateLocal] = useState("");
  const { closeModal } = useModal();


  const handleFilter = () => {
    dispatch(setMinPrice(minPrice));
    dispatch(setMaxPrice(maxPrice));
    dispatch(setCountry(country));
    dispatch(setState(state));
    history.push("")
    closeModal();


  };



  // const handleFilterSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     unitedStates ||
  //     unitedStatesWest ||
  //     unitedStatesMid ||
  //     unitedStatesEast ||
  //     unitedStatesSouth
  //   ) {
  //     setCountry("United States");
  //   }

  //   await dispatch(getAllFilteredSpots({ country, state, minPrice, maxPrice }));
  //   history.push("");
  //   closeModal();
  // };

  //
  // we need to create a new store that tracks filtered results....
  // lets show the total number of results
  // if zero don't let them filter

  // going to display a few regions
  // for Europe just create a drop down input for country name
  // for other counties just set State to a particular name

  const handleFlexibleClick = () => {
    setCountry("");

    setUnitedStates(false);
    setUnitedStatesEast(false);
    setUnitedStatesWest(false);
    setUnitedStatesSouth(false);
    setUnitedStatesMid(false);
  };
  const handleUsClick = () => {
    setUnitedStates(true);
    setUnitedStatesWest(false);
    setUnitedStatesEast(false);
    setUnitedStatesSouth(false);
    setUnitedStatesMid(false);
  };
  const handleWestClick = () => {
    setUnitedStatesWest(true);
    setUnitedStatesEast(false);
    setUnitedStatesSouth(false);
    setUnitedStatesMid(false);
    setUnitedStates(false);
  };
  const handleMidwestClick = () => {
    setUnitedStatesMid(true);
    setUnitedStatesWest(false);
    setUnitedStatesEast(false);
    setUnitedStatesSouth(false);
    setUnitedStates(false);
  };
  const handleEastClick = () => {
    setUnitedStatesEast(true);
    setUnitedStatesMid(false);
    setUnitedStatesWest(false);
    setUnitedStatesSouth(false);
    setUnitedStates(false);
  };
  const handleSouthClick = () => {
    setUnitedStatesSouth(true);
    setUnitedStatesEast(false);
    setUnitedStatesMid(false);
    setUnitedStatesWest(false);
    setUnitedStates(false);
  };

  return (
    <div className="filter-modal-container">
      <div className="price-header-text">Price range</div>
      <form
        onSubmit={handleFilter}
        className="filter-modal-form-container"
      >
        <div className="price-range-container">
          <input
            type="text"
            className="price-input"
            value={minPrice}
            placeholder="Minimum"
            onChange={(e) => setMinPriceLocal(e.target.value)}
          />
          {` - `}
          <input
            type="text"
            value={maxPrice}
            className="price-input"
            placeholder="Maximum"
            onChange={(e) => setMaxPriceLocal(e.target.value)}
          />
        </div>
        {/* lets just make a set of cards like airbnb */}
        <div className="country-images-container">
          <div
            className="map-image-text-container"
            onClick={handleFlexibleClick}
          >
            <img alt="" src={map1} className="each-map-image" />
            <div className="map-image-subtext"> I'm flexible</div>
          </div>
          <div className="map-image-text-container" onClick={handleUsClick}>
            <img alt="" src={map2} className="each-map-image" />
            <div className="map-image-subtext">United States</div>
          </div>
          <div className="map-image-text-container" onClick={handleWestClick}>
            <img alt="" src={map3} className="each-map-image" />
            <div className="map-image-subtext">West</div>
          </div>
          <div
            className="map-image-text-container"
            onClick={handleMidwestClick}
          >
            <img alt="" src={map4} className="each-map-image" />
            <div className="map-image-subtext">MidWest</div>
          </div>
          <div className="map-image-text-container" onClick={handleSouthClick}>
            <img alt="" src={map5} className="each-map-image" />
            <div className="map-image-subtext">South</div>
          </div>
          <div className="map-image-text-container" onClick={handleEastClick}>
            <img alt="" src={map6} className="each-map-image" />
            <div className="map-image-subtext">East</div>
          </div>
        </div>

        {!unitedStates &&
          !unitedStatesWest &&
          !unitedStatesMid &&
          !unitedStatesEast &&
          !unitedStatesSouth && (
            <div className="country-title">Search for a Country</div>
          )}
        {(unitedStates ||
          unitedStatesWest ||
          unitedStatesMid ||
          unitedStatesEast ||
          unitedStatesSouth) && (
          <div className="country-title">Select a State</div>
        )}

        <div className="select-country-container">
          {!unitedStates &&
            !unitedStatesWest &&
            !unitedStatesMid &&
            !unitedStatesEast &&
            !unitedStatesSouth && (
              <input
                type="text"
                value={country}
                className="country-filter-input"
                placeholder="Country"
                onChange={(e) => setCountryLocal(e.target.value)}
              />
            )}

          {unitedStates && (
            <select
              value={state}
              className="state-filter-input"
              onChange={(e) => setStateLocal(e.target.value)}
            >
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

          {unitedStatesWest && (
            <select
              value={state}
              className="state-filter-input"
              onChange={(e) => setStateLocal(e.target.value)}
            >
              <option value="">Select a state in the West</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Montana">Montana</option>
              <option value="Nevada">Nevada</option>
              <option value="New Mexico">New Mexico</option>
              <option value="Oregon">Oregon</option>
              <option value="Utah">Utah</option>
              <option value="Washington">Washington</option>
              <option value="Wyoming">Wyoming</option>
            </select>
          )}
          {unitedStatesMid && (
            <select
              value={state}
              className="state-filter-input"
              onChange={(e) => setStateLocal(e.target.value)}
            >
              <option value="">Select a state in the Midwest</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Missouri">Missouri</option>
              <option value="Nebraska">Nebraska</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Wisconsin">Wisconsin</option>
            </select>
          )}

          {unitedStatesSouth && (
            <select
              value={state}
              className="state-filter-input"
              onChange={(e) => setStateLocal(e.target.value)}
            >
              <option value="">Select a state in the South</option>
              <option value="Alabama">Alabama</option>
              <option value="Arkansas">Arkansas</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Mississippi">Mississippi</option>
              <option value="North Carolina">North Carolina</option>
              <option value="South Carolina">South Carolina</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Virginia">Virginia</option>
              <option value="West Virginia">West Virginia</option>
            </select>
          )}

          {unitedStatesEast && (
            <select
              value={state}
              className="state-filter-input"
              onChange={(e) => setStateLocal(e.target.value)}
            >
              <option value="">Select a state in the East</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="Georgia">Georgia</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New York">New York</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
            </select>
          )}
        </div>
        <div className="submit-filter-container">
          <input
            type="submit"
            className="submit-filter-button-modal"
            value="Filter Search Results"
            //   disabled={}
          />
          <div className="total-filtered">Available listings:</div>
        </div>
      </form>
    </div>
  );
}

export default FilterModal;
