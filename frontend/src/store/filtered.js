import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";

export const loadFilteredSpots = (allSpotData) => ({
  type: LOAD_SPOTS,
  payload: allSpotData,
});

export const getAllFilteredSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/filter");

  if (response.ok) {
    const allSpotData = await response.json();
    const normalizedAllSpotData = {};
    allSpotData.Spots.forEach((e) => {
      normalizedAllSpotData[e.id] = e;
    });

    dispatch(loadFilteredSpots(normalizedAllSpotData));
  }
};

// export const getFilteredSpotByIdThunk = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`);

//   if (response.ok) {
//     const singleSpotData = await response.json();
//     const normalizedSpotData = {};
//     normalizedSpotData[singleSpotData.id] = singleSpotData;
//     dispatch(loadFilteredSpots(normalizedSpotData));
//   }
// };

const initialState = {};

const filteredSpotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default filteredSpotsReducer;
