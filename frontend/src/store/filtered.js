import { csrfFetch } from "./csrf";

const SET_MIN_PRICE = "SET_MIN_PRICE";
const SET_MAX_PRICE = "SET_MAX_PRICE";
const SET_COUNTRY = "SET_COUNTRY";
const SET_STATE = "SET_STATE";

export const setMinPrice = (minPrice) => ({
  type: SET_MIN_PRICE,
  payload: minPrice,
});

export const setMaxPrice = (maxPrice) => ({
  type: SET_MAX_PRICE,
  payload: maxPrice,
});

export const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country,
});

export const setState = (state) => ({
  type: SET_STATE,
  payload: state,
});

const initialState = {
  minPrice: "",
  maxPrice: "",
  country: "",
  state: "",
};

const filteredSpotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload,
      };
    case SET_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload,
      };
    case SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case SET_STATE:
      return {
        ...state,
        state: action.payload,
      };
    default:
      return state;
  }
};

export default filteredSpotsReducer;
