import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function FilterModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");






  const { closeModal } = useModal();

  const handleShowSpotsClick = (e) => {
    e.preventDefault();
    history.push(`/`);
    closeModal();
  };

// 
// we need to create a new store that tracks filtered results.... 
// lets show the total number of results 
// if zero don't let them filter

  return (
    <div  className="filter-modal-container">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default FilterModal;
