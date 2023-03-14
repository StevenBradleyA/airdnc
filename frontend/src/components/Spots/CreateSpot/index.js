import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk } from "../../../store/spots";
import CreateSpotForm from "./CreateSpotForm";
import "./CreateSpot.css";

const CreateSpot = () => {
  const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) {
      history.push("/");
    }


  return (
    <div>
      <h1> yoyo </h1>
      <h1> yoyo </h1>
      <h1> yoyo </h1>
        <CreateSpotForm/>
    </div>
  );
};

export default CreateSpot;
