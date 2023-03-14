import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from 'react';

import "./CreateSpot.css";

const CreateSpotForm = () => {
const history = useHistory();
const [address, setAddress] = useState('')
const [city, setCity]= useState('')
const [state, setState]= useState('')
const [country, setCountry]= useState('')
const [name, setName]= useState('')
const [description, setDescription]= useState('')
const [price, setPrice]= useState('')
const [previewImage, setPreviewImage] = useState('')


  const handleCreateSpotClick = (e) => {
    e.preventDefault();
    const createSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };
    dispatch(createSpotThunk(createSpot));
    // history.push(`/spots/${}`)
  };


  return (
    <div>
        <h1>Create a new Spot</h1>
        <h2>Where's your place located?</h2>
        <h3>Guests will only get your exact address once they have booked a reservation.</h3>
        <form>



        </form>
    </div>
  );
};

export default CreateSpotForm;
