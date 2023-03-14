import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";

const getSpots = (allSpotData) => ({
  type: GET_SPOTS,
  payload: allSpotData,
});

const createSpot = (newSpotData) => ({
  type: CREATE_SPOTS,
  payload: newSpotData,
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
    dispatch(getSpots(normalizedSpotData));
  }
};

export const createSpotThunk = (newSpotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });

  if (response.ok) {
    const newSpotData = await response.json();
    const normalizedSpotData = {};
    normalizedSpotData[newSpotData.id] = newSpotData;
    // console.log('hello there',normalizedSpotData)
    dispatch(createSpot(normalizedSpotData));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case GET_SPOTS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default spotsReducer;
