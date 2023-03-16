import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";

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
const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId,
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

export const getOwnedSpotsThunk = () => async (dispatch) => {
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
    console.log("validation error");
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
    console.log("why helloooooo", error);
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    const normalizedSpotData = {};
    normalizedSpotData[data.id] = data;
    dispatch(deleteSpot(normalizedSpotData));
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
