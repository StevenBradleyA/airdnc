import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { createSpotThunk, updateSpotThunk } from "../../../store/spots";
import "./CreateSpot.css";

const CreateSpotForm = ({ formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errorsArr = [];
    const errorsObj = {};
    if (country.length === 0) {
      errorsObj.country = "Country is required";
    }
    if (address.length === 0) {
      errorsObj.address = "Address is required";
    }
    if (city.length === 0) {
      errorsObj.city = "City is required";
    }
    if (state.length === 0) {
      errorsObj.state = "State is required";
    }
    if (description.length < 30) {
      errorsObj.description = "Description needs a minimum of 30 characters";
    }
    if (name.length === 0) {
      errorsObj.name = "Name is required";
    }
    if (!price) {
      errorsObj.price = "Price is required";
    }
    if (previewImage.length === 0) {
      errorsObj.previewImage = "Preview image is required";
    }
    if (
      errorsObj.country ||
      errorsObj.address ||
      errorsObj.city ||
      errorsObj.state ||
      errorsObj.description ||
      errorsObj.name ||
      errorsObj.price ||
      errorsObj.previewImage
    ) {
      errorsArr.push(errorsObj);
    }
    setErrors(errorsArr);
  }, [country, address, city, state, description, name, price, previewImage]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (errors.length > 0) return;
    const spotInformation = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      previewImage,
    };
    dispatch(createSpotThunk(spotInformation));
    history.push(`/`);
    // not quite sure how to access new id here? /spots/newid
    // I also think handle submit needs to be async and await the result of the dispatch
    // if (formType === "create") {
    //   dispatch(createSpotThunk(spotInformation));
    //   history.push(`/`);
    // }
    // if (formType === "update") {
    //   dispatch(updateSpotThunk(spotInformation));
    //   history.push(`/`);
    // }
  };

  


  return (
    <div>
      {formType === "create" && <h1>Create a Spot</h1>}
      {formType === "update" && <h1>Update your Spot</h1>}
      <h2>Where's your place located?</h2>
      <h3>
        Guests will only get your exact address once they have booked a
        reservation.
      </h3>
      <form onSubmit={handleFormSubmit}>
        <label>
          Country
          <input
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        {errors.length > 0 && <p className="errors">{errors[0].country}</p>}
        <label>
          Street Address
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {errors.length > 0 && <p className="errors">{errors[0].address}</p>}

        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        {errors.length > 0 && <p className="errors">{errors[0].city}</p>}


        <label>
          State
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        {errors.length > 0 && <p className="errors">{errors[0].state}</p>}


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
        {errors.length > 0 && <p className="errors">{errors[0].description}</p>}


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
        {errors.length > 0 && <p className="errors">{errors[0].name}</p>}


        <h1>Set a base price for your spot</h1>
        <label>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
          <input
            type="number"
            placeholder="Price per night (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        {errors.length > 0 && <p className="errors">{errors[0].price}</p>}


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
        {errors.length > 0 && <p className="errors">{errors[0].previewImage}</p>}

        <p></p>
        <input type="submit" value="Create Spot" disabled={errors.length > 0} />
      </form>
    </div>
  );
};

export default CreateSpotForm;
