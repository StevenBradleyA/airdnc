import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";

const getSpots = (allSpotData) => ({
  type: GET_SPOTS,
  payload: allSpotData,
});

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const allSpotData = await response.json();
    const normalizedAllSpotData = {};
    allSpotData.Spots.forEach((e) => {
      normalizedAllSpotData[e.id] = e;
    });

    dispatch(getSpots(normalizedAllSpotData));
  }
};

export const getSpotByIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const singleSpotData = await response.json();
    const normalizedSpotData = {};
    normalizedSpotData[singleSpotData.id] = singleSpotData;
    // console.log('hello there',normalizedSpotData)
    dispatch(getSpots(normalizedSpotData));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default spotsReducer;
