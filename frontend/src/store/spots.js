import { csrfFetch } from "./csrf";

const READ_SPOTS = "spots/READ_SPOTS"

const readSpots = (allSpotData)=> ({
    type: READ_SPOTS,
    payload: allSpotData
})

export const readAllSpotsAction = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json()
    console.log(data)
    dispatch(readSpots(data))


}

// export const restoreUser = () => async (dispatch) => {
//     const response = await csrfFetch("/api/session");
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
//   };

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // case SET_USER:
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
