import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk } from "../../../store/spots";
import { useHistory } from "react-router-dom";
import "./CreateSpot.css";

const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    history.push("/");
  }

  const handleCreateSpotClick = (e) => {
    e.preventDefault();
    // const createSpot = {
    //   address,
    //   city,
    //   state,
    //   country,
    //   lat,
    //   lng,
    //   name,
    //   description,
    //   price,
    // };
    // dispatch(createSpotThunk(createSpot));
    // history.push(`/spots/${}`)
  };

  return <div>yo</div>;
};

export default CreateSpot;
