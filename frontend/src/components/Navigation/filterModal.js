import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function FilterModal() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleShowSpotsClick = (e) => {
    e.preventDefault();
    history.push(`/`);
    closeModal();
  };

  return (
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default FilterModal;
