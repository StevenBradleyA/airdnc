import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";

export const loadFilteredSpots = (allSpotData) => ({
  type: LOAD_SPOTS,
  payload: allSpotData,
});

// export const getAllFilteredSpotsThunk = () => async (dispatch) => {
//   const response = await csrfFetch("/api/spots/filter");

//   if (response.ok) {
//     const allSpotData = await response.json();
//     const normalizedAllSpotData = {};
//     allSpotData.Spots.forEach((e) => {
//       normalizedAllSpotData[e.id] = e;
//     });

//     dispatch(loadFilteredSpots(normalizedAllSpotData));
//   }
// };

export const getAllFilteredSpots = (filterParams) => async (dispatch) => {
  const queryParams = new URLSearchParams(filterParams).toString();
  const url = `/api/spots/filter?${queryParams}`;

  try {
    const response = await csrfFetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch filtered spots.");
    }

    const allSpotData = await response.json();
    const normalizedAllSpotData = {};
    allSpotData.Spots.forEach((e) => {
      normalizedAllSpotData[e.id] = e;
    });

    dispatch(loadFilteredSpots(normalizedAllSpotData));

    //   dispatch(loadFilteredSpots(allSpotData.Spots));
  } catch (error) {
    console.error(error);
  }
};

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
