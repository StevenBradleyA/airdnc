import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
// const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const loadReviews = (allReviewData) => ({
  type: LOAD_REVIEWS,
  payload: allReviewData,
});

const createReview = (newReviewData) => ({
  type: CREATE_REVIEW,
  payload: newReviewData,
});

// const updateReview = (updatedReviewData) => ({
//   type: UPDATE_REVIEW,
//   payload: updatedReviewData,
// });
const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
});

export const getAllReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const data = await response.json();
    const normalizedReviewData = {};
    data.Reviews.forEach((e) => {
      normalizedReviewData[e.id] = e;
    });

    dispatch(loadReviews(normalizedReviewData));
  }
};
// ****** Later profile implementation if a user wants to see all their reviews and edit them *******
// export const getOwnedReviewsThunk = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/reviews/current`);

//   if (response.ok) {
//     const data = await response.json();
//     const normalizedReviewData = {};
//     data.Reviews.forEach((e) => {
//       normalizedReviewData[e.id] = e;
//     });

//     dispatch(loadReviews(normalizedReviewData));
//   }
// };



export const createSpotThunk = (newSpotData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSpotData),
    });

    const data = await response.json();
    const normalizedSpotData = {};
    normalizedSpotData[data.id] = data;
    dispatch(createSpot(normalizedSpotData));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSpotThunk = (newSpotData, spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSpotData),
    });
    const data = await response.json();
    const normalizedSpotData = {};
    normalizedSpotData[data.id] = data;
    dispatch(updateSpot(normalizedSpotData));
    return data;
  } catch (error) {
    console.log('hello error')
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // const data = await response.json();
    // const normalizedSpotData = {};
    // normalizedSpotData[data.id] = data;
    dispatch(deleteSpot(spotId));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, ...action.payload };
    case CREATE_SPOT:
      return { ...state, ...action.payload };
    case UPDATE_SPOT:
      return { ...state, ...action.payload };
    case DELETE_SPOT:

      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
