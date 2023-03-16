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

export const createReviewThunk = (newReviewData, spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReviewData),
    });

    const data = await response.json();
    const normalizedSpotData = {};
    normalizedSpotData[data.id] = data;
    dispatch(createReview(normalizedSpotData));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
   
    dispatch(deleteReview(reviewId));
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_REVIEWS:
      return { ...state, ...action.payload };
    case CREATE_REVIEW:
      return { ...state, ...action.payload };
    // case UPDATE_REVIEW:
      // return { ...state, ...action.payload };
    case DELETE_REVIEW:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
