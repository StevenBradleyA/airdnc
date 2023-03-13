import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";
const GET_SPOT_BY_ID = "spots/GET_SPOT_BY_ID"

const getSpots = (allSpotData) => ({
  type: GET_SPOTS,
  payload: allSpotData,
});

const getSpotById = (spotData) => ({
type: GET_SPOT_BY_ID,
payload: spotData
})

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
    dispatch(getSpotById(normalizedSpotData));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      let newState = { ...state, ...action.payload };
      return newState;
    case GET_SPOT_BY_ID:
      newState = {...state, ...action.payload}
      return newState

    default:
      return state;
  }
};

export default spotsReducer;
