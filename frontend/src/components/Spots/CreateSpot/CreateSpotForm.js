import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { createSpotThunk } from "../../../store/spots";
import "./CreateSpot.css";

const CreateSpotForm = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleCreateSpotSubmit = (e) => {
    e.preventDefault();
    const createSpot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      previewImage,
    };
    dispatch(createSpotThunk(createSpot));
    // history.push(`/spots/${}`)
  };

  return (
    <div>
      <h1>Create a new Spot</h1>
      <h2>Where's your place located?</h2>
      <h3>
        Guests will only get your exact address once they have booked a
        reservation.
      </h3>
      <form>
        <label>
          Country
          <input
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <h1>Describe your place to guests</h1>
        <label>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <h1>Create a title for your spot</h1>
        <label>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <h1>Set a base price for your spot</h1>
        <label>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
          <input
            type="text"
            placeholder="Price per night (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <h1>Liven up your spot with photos</h1>
        <label>
          Submit a link to at least one photo to publish your spot.
          <input
            type="url"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label>
        <button type="submit" onSubmit={handleCreateSpotSubmit}>
          Create Spot
        </button>
      </form>
    </div>
  );
};

export default CreateSpotForm;
