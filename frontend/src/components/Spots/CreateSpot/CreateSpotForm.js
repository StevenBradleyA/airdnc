import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { createSpotThunk, updateSpotThunk } from "../../../store/spots";
import "./CreateSpot.css";
import logo from "../../../media/logo-location.svg"

const CreateSpotForm = ({ formType, spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [nonPreviewImage1, setNonPreviewImage1] = useState("");
  const [nonPreviewImage2, setNonPreviewImage2] = useState("");
  const [nonPreviewImage3, setNonPreviewImage3] = useState("");
  const [nonPreviewImage4, setNonPreviewImage4] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // I want to refactor non preview images in a function so somone could put as many
  // as they would like for there home. also my code is super wet.
  const handleInputErrors = () => {
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
    if (!lat || isNaN(lat) || lat < -90 || lat > 90) {
      errorsObj.lat = "Latitude is invalid";
    }

    if (!lng || isNaN(lng) || lng < -180 || lng > 180) {
      errorsObj.lng = "Longitude is invalid";
    }
    if (previewImage.length === 0) {
      errorsObj.previewImage = "Preview image is required";
    }

    const unneccesaryUrlCheck = (image, keyName) => {
      const fileExtensions = [
        image.split(".png"),
        image.split(".jpg"),
        image.split(".jpeg"),
      ];
      if (fileExtensions.some((e) => e.length > 1)) {
        delete errorsObj[keyName];
      } else {
        errorsObj[keyName] = "Image URL must end in .png .jpg or .jpeg";
      }
    };

    unneccesaryUrlCheck(previewImage, "wrongEnding");

    if (nonPreviewImage1.length === 0) {
      errorsObj.nonPreviewImage1 = "Additional image 1 is required";
    }
    unneccesaryUrlCheck(nonPreviewImage1, "wrongEnding1");

    if (nonPreviewImage2.length === 0) {
      errorsObj.nonPreviewImage2 = "Additional image 2 is required";
    }
    unneccesaryUrlCheck(nonPreviewImage2, "wrongEnding2");

    if (nonPreviewImage3.length === 0) {
      errorsObj.nonPreviewImage3 = "Additional image 3 is required";
    }
    unneccesaryUrlCheck(nonPreviewImage3, "wrongEnding3");

    if (nonPreviewImage4.length === 0) {
      errorsObj.nonPreviewImage4 = "Additional image 4 is required";
    }
    unneccesaryUrlCheck(nonPreviewImage4, "wrongEnding4");

    setErrors(errorsObj);
  };
  useEffect(() => {
    handleInputErrors();
  }, [
    country,
    address,
    city,
    state,
    description,
    name,
    price,
    lat,
    lng,
    previewImage,
    nonPreviewImage1,
    nonPreviewImage2,
    nonPreviewImage3,
    nonPreviewImage4,
  ]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const imageArr = [];
      imageArr.push(
        nonPreviewImage1,
        nonPreviewImage2,
        nonPreviewImage3,
        nonPreviewImage4
      );
      const spotInformation = {
        address,
        city,
        state,
        country,
        name,
        description,
        lat,
        lng,
        price,
        previewImage,
        imageArr,
      };
      let newSpot;
      if (formType === "create") {
        newSpot = await dispatch(createSpotThunk(spotInformation));
      }
      if (formType === "update") {
        newSpot = await dispatch(updateSpotThunk(spotInformation, spotId));
      }
      history.push(`/spots/${newSpot.id}`);
    }
    setHasSubmitted(true);
  };

  return (
    <div className="create-spot-container">
        {formType === "create" && (
          <div className="create-spot-heading">List your couch <img alt="couch" src={logo} className="header-logo-create"/></div>
        )}
        {formType === "update" && (
          <div className="create-spot-heading">Update your listing <img alt="couch" src={logo} className="header-logo-create"/></div>
        )}
        <div className="sub-title-text">Where's your place located?</div>
        <div className="sub-title-info">
          Guests will only get your exact address once they have booked a
          reservation.
        </div>

      <form onSubmit={handleFormSubmit} className="create-form-container">
      <label className="create-spot-label">

          Country
          </label>
          <input
            type="text"
            className="basic-input"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        {hasSubmitted && errors.country && (
          <p className="errors">{errors.country}</p>
        )}
        <label className="create-spot-label">


          Street Address
          </label>
          <input
            type="text"
            className="basic-input"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        {hasSubmitted && errors.address && (
          <p className="errors">{errors.address}</p>
        )}
        <label className="create-spot-label">


          City
          </label>
          <input
            type="text"
            className="basic-input"

            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        {hasSubmitted && errors.city && <p className="errors">{errors.city}</p>}
        <label className="create-spot-label">


          State
          </label>
          <input
            type="text"
            placeholder="State"
            className="basic-input"

            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        {hasSubmitted && errors.state && (
          <p className="errors">{errors.state}</p>
        )}
        <div className="form-spacer"></div>

        <div className="sub-title-text">Provide coordinates of your place</div>
        <label className="create-spot-label">

          Coordinates will help users plan with google maps.
          </label>
          <input
            type="text"
            placeholder="lat"
            className="basic-input"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            type="text"
            placeholder="lng"
            className="basic-input"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        {hasSubmitted && errors.lng && <p className="errors">{errors.lat}</p>}
        {hasSubmitted && errors.lng && <p className="errors">{errors.lng}</p>}
        <div className="form-spacer"></div>

        <div className="sub-title-text">Describe your place to guests</div>
        <label className="create-spot-label">

          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
          </label>
          <textarea
            placeholder="Please write at least 30 characters"
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        {hasSubmitted && errors.description && (
          <p className="errors">{errors.description}</p>
        )}
        <div className="form-spacer"></div>

        <div className="sub-title-text">Create a title for your place</div>
        <label className="create-spot-label">

          Catch guests' attention with a spot title that highlights what makes
          your place special.
          </label>
          <input
            type="text"
            placeholder="Name of your place"
            className="basic-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        {hasSubmitted && errors.name && <p className="errors">{errors.name}</p>}
        <div className="form-spacer"></div>

        <div className="sub-title-text">Set a base price for your guests</div>
        <label className="create-spot-label">

          Competitive pricing can help your listing stand out and rank higher in
          search results.
          </label>
          <input
            type="number"
            placeholder="Price per night (USD)"
            className="basic-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        {hasSubmitted && errors.price && (
          <p className="errors">{errors.price}</p>
        )}
        <div className="form-spacer"></div>

        <div className="sub-title-text">Liven up your listing with photos</div>
        <label className="create-spot-label">

          Submit a link to at least one photo to publish your place.
          </label>
          <input
            type="text"
            placeholder="Preview Image URL"
            className="basic-input"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        {hasSubmitted && errors.previewImage && (
          <p className="errors">{errors.previewImage}</p>
        )}
        {hasSubmitted && errors.wrongEnding && (
          <p className="errors">{errors.wrongEnding}</p>
        )}
        <label className="create-spot-label">

          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="basic-input"
            value={nonPreviewImage1}
            onChange={(e) => setNonPreviewImage1(e.target.value)}
          />
        {hasSubmitted && errors.nonPreviewImage1 && (
          <p className="errors">{errors.nonPreviewImage1}</p>
        )}
        {hasSubmitted && errors.wrongEnding1 && (
          <p className="errors">{errors.wrongEnding1}</p>
        )}
          <input
            type="text"
            placeholder="Image URL"
            className="basic-input"
            value={nonPreviewImage2}
            onChange={(e) => setNonPreviewImage2(e.target.value)}
          />
        {hasSubmitted && errors.nonPreviewImage2 && (
          <p className="errors">{errors.nonPreviewImage2}</p>
        )}
        {hasSubmitted && errors.wrongEnding2 && (
          <p className="errors">{errors.wrongEnding2}</p>
        )}
          <input
            type="text"
            placeholder="Image URL"
            className="basic-input"
            value={nonPreviewImage3}
            onChange={(e) => setNonPreviewImage3(e.target.value)}
          />
        {hasSubmitted && errors.nonPreviewImage3 && (
          <p className="errors">{errors.nonPreviewImage3}</p>
        )}
        {hasSubmitted && errors.wrongEnding3 && (
          <p className="errors">{errors.wrongEnding3}</p>
        )}
          <input
            type="text"
            placeholder="Image URL"
            className="basic-input"
            value={nonPreviewImage4}
            onChange={(e) => setNonPreviewImage4(e.target.value)}
          />
        {hasSubmitted && errors.nonPreviewImage4 && (
          <p className="errors">{errors.nonPreviewImage4}</p>
        )}
        {hasSubmitted && errors.wrongEnding4 && (
          <p className="errors">{errors.wrongEnding4}</p>
        )}
          <div className="create-spot-button-container">

          <input
            className="create-spot-button"
            type="submit"
            value={formType === "create" ? "Create Spot" : "Update Your Spot"}
            disabled={hasSubmitted && Object.values(errors).length > 0}
            />
            </div>
      </form>
    </div>
  );
};

export default CreateSpotForm;
