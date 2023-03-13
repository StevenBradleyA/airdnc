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
    const allSpotDataObj ={}
      allSpotData.Spots.forEach(e => {
        allSpotDataObj[e.id]= e
      });
      
    dispatch(getSpots(allSpotDataObj));
  }
};

// export const restoreUser = () => async (dispatch) => {
//     const response = await csrfFetch("/api/session");
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
//   };

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SPOTS:
      newState = { ...action.payload };
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
