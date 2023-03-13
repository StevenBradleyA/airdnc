import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";

const getSpots = (allSpotData) => ({
  type: GET_SPOTS,
  payload: allSpotData,
});

export const getAllSpotsAction = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const allSpotData = await response.json();
    dispatch(getSpots(allSpotData.Spots));
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
    let newState = {...state}
  switch (action.type) {
    case GET_SPOTS:
        newState = {...action.spots}
        return newState
        
    //   newState = Object.assign({}, state);
    //   newState.user = action.payload;
    //   return newState;
    // case REMOVE_USER:
    //   newState = Object.assign({}, state);
    //   newState.user = null;
    //   return newState;
    default:
      return state;
  }
};

export default spotsReducer;
