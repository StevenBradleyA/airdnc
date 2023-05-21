import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";
const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

export const loadBookings = (allBookingData) => ({
  type: LOAD_BOOKINGS,
  payload: allBookingData,
});

const createBooking = (newBookingData) => ({
  type: CREATE_BOOKING,
  payload: newBookingData,
});

const updateBooking = (updatedBookingData) => ({
  type: UPDATE_BOOKING,
  payload: updatedBookingData,
});
const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  payload: bookingId,
});

export const getAllBookingsBySpotIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const data = await response.json();
    const normalizedBookingData = {};
    data.Bookings.forEach((e) => {
      normalizedBookingData[e.id] = e;
    });
    dispatch(loadBookings(normalizedBookingData));
  }
};


export const getAllOwnedBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);
  
    if (response.ok) {
      const allBookingData = await response.json();
      const normalizedBookingData = {};
      allBookingData.Bookings.forEach((e) => {
        normalizedBookingData[e.id] = e;
      });
      dispatch(loadBookings(normalizedBookingData));
    }
  };


export const createBookingThunk = (spotId, newBookingData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBookingData),
    });

    const data = await response.json();
    const normalizedBookingData = {};
    normalizedBookingData[data.id] = data;
    dispatch(createBooking(normalizedBookingData));
    return data;
  } catch (error) {
    console.log(error);
  }
};





export const updateBookingThunk =
  (newBookingData, bookingId) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookingData),
      });
      const data = await response.json();
      const normalizedBookingData = {};
      normalizedBookingData[data.id] = data;
      dispatch(updateBooking(normalizedBookingData));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteBooking(bookingId));
  }
};

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BOOKINGS:
      return { ...state, ...action.payload };
    case CREATE_BOOKING:
      return { ...state, ...action.payload };
    case UPDATE_BOOKING:
      return { ...state, ...action.payload };
    case DELETE_BOOKING:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
