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
  const [nonPreviewImage1, setNonPreviewImage1] = useState("");
  const [nonPreviewImage2, setNonPreviewImage2] = useState("");
  const [nonPreviewImage3, setNonPreviewImage3] = useState("");
  const [nonPreviewImage4, setNonPreviewImage4] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // I want to refactor non preview images in a function so somone could put as many
  // as they would like for there home. also my code is super wet.
console.log(formType)
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
    if (previewImage.length === 0) {
      errorsObj.previewImage = "Preview image is required";
    }

    const unneccesaryUrlCheck = (image, keyName) => {
      const totalPngWords = image.split(".png");
      const totalJpgWords = image.split(".jpg");
      const totalJpegWords = image.split(".jpeg");
      if (
        [totalPngWords, totalJpgWords, totalJpegWords].some((e) => e.length < 2)
      ) {
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
        price,
        previewImage,
        imageArr,
      };

      // let newSpot = await dispatch(createSpotThunk(spotInformation));
      // history.push(`/spots/${newSpot.id}`);
      let newSpot;
      if (formType === "create") {
        newSpot = await dispatch(createSpotThunk(spotInformation));
      }
      if (formType === "update") {
        newSpot = await dispatch(updateSpotThunk(spotInformation, newSpot.id));
      }
      history.push(`/spots/${newSpot.id}`);
    }
    setHasSubmitted(true);
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
        {hasSubmitted && errors.country && (
          <p className="errors">{errors.country}</p>
        )}
        <label>
          Street Address
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.address && (
          <p className="errors">{errors.address}</p>
        )}
        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.city && <p className="errors">{errors.city}</p>}
        <label>
          State
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.state && (
          <p className="errors">{errors.state}</p>
        )}
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
        {hasSubmitted && errors.description && (
          <p className="errors">{errors.description}</p>
        )}
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
        {hasSubmitted && errors.name && <p className="errors">{errors.name}</p>}
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
        {hasSubmitted && errors.price && (
          <p className="errors">{errors.price}</p>
        )}
        <h1>Liven up your spot with photos</h1>
        <label>
          Submit a link to at least one photo to publish your spot.
          <p></p>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.previewImage && (
          <p className="errors">{errors.previewImage}</p>
        )}
        {hasSubmitted && errors.wrongEnding && (
          <p className="errors">{errors.wrongEnding}</p>
        )}
        <p></p>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={nonPreviewImage1}
            onChange={(e) => setNonPreviewImage1(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.nonPreviewImage1 && (
          <p className="errors">{errors.nonPreviewImage1}</p>
        )}
        {hasSubmitted && errors.wrongEnding1 && (
          <p className="errors">{errors.wrongEnding1}</p>
        )}
        <p></p>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={nonPreviewImage2}
            onChange={(e) => setNonPreviewImage2(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.nonPreviewImage2 && (
          <p className="errors">{errors.nonPreviewImage2}</p>
        )}
        {hasSubmitted && errors.wrongEnding2 && (
          <p className="errors">{errors.wrongEnding2}</p>
        )}
        <p></p>{" "}
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={nonPreviewImage3}
            onChange={(e) => setNonPreviewImage3(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.nonPreviewImage3 && (
          <p className="errors">{errors.nonPreviewImage3}</p>
        )}
        {hasSubmitted && errors.wrongEnding3 && (
          <p className="errors">{errors.wrongEnding3}</p>
        )}
        <p></p>{" "}
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={nonPreviewImage4}
            onChange={(e) => setNonPreviewImage4(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.nonPreviewImage4 && (
          <p className="errors">{errors.nonPreviewImage4}</p>
        )}
        {hasSubmitted && errors.wrongEnding4 && (
          <p className="errors">{errors.wrongEnding4}</p>
        )}
        <p></p>
        <input type="submit" value="Create Spot" disabled={errors.length > 0} />
      </form>
    </div>
  );
};

export default CreateSpotForm;
