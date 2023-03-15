import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";

const loadSpots = (allSpotData) => ({
  type: LOAD_SPOTS,
  payload: allSpotData,
});

const createSpot = (newSpotData) => ({
  type: CREATE_SPOT,
  payload: newSpotData,
});

const updateSpot = (updatedSpotData) => ({
  type: UPDATE_SPOT,
  payload: updatedSpotData,
});

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const allSpotData = await response.json();
    const normalizedAllSpotData = {};
    allSpotData.Spots.forEach((e) => {
      normalizedAllSpotData[e.id] = e;
    });

    dispatch(loadSpots(normalizedAllSpotData));
  }
};

export const getSpotByIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const singleSpotData = await response.json();
    const normalizedSpotData = {};
    normalizedSpotData[singleSpotData.id] = singleSpotData;
    dispatch(loadSpots(normalizedSpotData));
  }
};

export const getOwnedSpotsThunk = (ownedSpotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    const allSpotData = await response.json();
    const normalizedAllSpotData = {};
    allSpotData.Spots.forEach((e) => {
      normalizedAllSpotData[e.id] = e;
    });

    dispatch(loadSpots(normalizedAllSpotData));
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

export const updateSpotThunk = (newSpotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });

  if (response.ok) {
    const newSpotData = await response.json();
    const normalizedSpotData = {};
    normalizedSpotData[newSpotData.id] = newSpotData;
    // console.log('hello there',normalizedSpotData)
    dispatch(updateSpot(normalizedSpotData));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, ...action.payload };
    case CREATE_SPOT:
      return { ...state, ...action.payload };
    case UPDATE_SPOT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default spotsReducer;
