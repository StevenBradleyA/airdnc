import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";
import "./UpdateBooking.css";
import { getAllBookingsBySpotIdThunk } from "../../../../store/booking";
import CalendarDateRange from "../../SpotDetails/calendar";

function UpdateBookingModal({ booking }) {
  const spotId = booking.spotId;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    dispatch(getAllBookingsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

  const allBookings = useSelector((state) => Object.values(state.bookings));

  const allSpots = useSelector((state) => state.spots);
  const currentSpot = allSpots[spotId];
  const sessionUser = useSelector((state) => state.session.user);

  let start;
  let end; 
    if(selectedStartDate){
        start = selectedStartDate.toDateString()

    }
    if(selectedEndDate){
        end = selectedEndDate.toDateString()

    }

  
  const displayDate = (date) => {
      const dateObject = new Date(date);
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      const year = dateObject.getFullYear();
      return `${month}/${day}/${year}`;
    };
    
    const backendDate = (date) => {
        const [month, day, year] = date.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };
    
    
    useEffect(() => {
        if (start) {
            const formattedStartDate = displayDate(start);
            setStartDate(formattedStartDate);
        }
        if (end) {
            const formattedEndDate = displayDate(end);
            setEndDate(formattedEndDate);
        }
    }, [start, end]);
    
    const handleDateRangeSelect = (startDate, endDate) => {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
    };


  const disabledDates = allBookings.map((booking) => {
    return {
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
    };
  });

  const handleInputErrors = () => {
    const errorsObj = {};

    if (!sessionUser) {
      errorsObj.user = "Sign in to make a booking";
    }
    if (!startDate) {
      errorsObj.startDate = "Must select a start date";
    }

    if (!endDate) {
      errorsObj.endDate = "Must select an end date";
    }
    if(sessionUser.id === currentSpot.ownerId){

        errorsObj.endDate = "Cannot Book a place you own";

    }

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/;
    if (!dateRegex.test(startDate)) {
        errorsObj.startDate = "Invalid start date";
      }
      
      if (!dateRegex.test(endDate)) {
        errorsObj.endDate = "Invalid end date";
      }


    if (startDate && endDate) {
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);

      for (const booking of disabledDates) {
        const { startDate: bookingStartDate, endDate: bookingEndDate } =
          booking;

        if (
          (selectedStartDate >= bookingStartDate &&
            selectedStartDate <= bookingEndDate) ||
          (selectedEndDate >= bookingStartDate &&
            selectedEndDate <= bookingEndDate) ||
          (selectedStartDate <= bookingStartDate &&
            selectedEndDate >= bookingEndDate) ||
          (selectedStartDate >= bookingStartDate &&
            selectedEndDate <= bookingEndDate)
        ) {
          errorsObj.startDate = "Start date conflicts with an existing booking";
          errorsObj.endDate = "End date conflicts with an existing booking";
          break;
        }
      }

      if (!errorsObj.startDate && !errorsObj.endDate) {
        for (const booking of disabledDates) {
          const { startDate: bookingStartDate, endDate: bookingEndDate } =
            booking;

          if (
            selectedStartDate <= bookingStartDate &&
            selectedEndDate >= bookingEndDate
          ) {
            errorsObj.startDate =
              "Booking falls within an existing booking's range";
            errorsObj.endDate =
              "Booking falls within an existing booking's range";
            break;
          }
        }
      }
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [startDate, endDate]);



  const handleUpdateBooking = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const formattedStart = backendDate(startDate);
      const formattedEnd = backendDate(endDate);
      const newBookingData = {
        spotId,
        startDate: formattedStart,
        endDate: formattedEnd,
      };

    //   dispatch(createBookingThunk(spotId, newBookingData));
    }
    setHasSubmitted(true);
  };






    if (!currentSpot) {
      return <h1>LOADING...</h1>;
    }
    
  return (
    <div className="update-booking-container-modal">
      <div className="update-booking-heading">Update your booking</div>
     

<form onSubmit={handleUpdateBooking} className="update-booking-form-container">
        {hasSubmitted && errors.startDate && (
          <div className="errors">{errors.startDate}</div>
        )}
        {hasSubmitted && errors.endDate && (
          <div className="errors">{errors.endDate}</div>
        )}
        {hasSubmitted && errors.user && (
          <div className="errors">{errors.user}</div>
        )}
        <div className="update-booking-input-container">
          <div className="left-update-booking-start">
            <div className="booking-input-subtext"> CURRENT CHECK-IN</div>
            <input
              type="text"
              value={startDate}
              className="booking-date-input"
              placeholder="Start date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="right-update-booking-end">
            <div className="booking-input-subtext"> CURRENT CHECKOUT</div>

            <input
              type="text"
              value={endDate}
              className="booking-date-input"
              placeholder="End date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div>Select a new date on the calendar</div>
        <CalendarDateRange
        currentSpot={currentSpot}
        allBookings={allBookings}
        onDateRangeSelect={handleDateRangeSelect}
      />
        <button
          type="submit"
          className="update-booking-button"
          disabled={
            hasSubmitted && !sessionUser && Object.values(errors).length > 0
          }
        >
          Update
        </button>
      </form>

      {/* <form
        onSubmit={handleReviewSubmit}
        className="create-review-form-container"
      >
        {hasSubmitted && errors.review && (
          <p className="errors">{errors.review}</p>
        )}
        {hasSubmitted && errors.stars && (
          <p className="errors">{errors.stars}</p>
        )}

        <textarea
          type="text"
          value={reviewText}
          className="leave-review"
          placeholder="Leave your review here..."
          onChange={(e) => setReviewText(e.target.value)}
        />

        <div className="stars-rating-container">
          <StarsRatingInput
            disabled={false}
            onChange={onChange}
            stars={stars}
          />

          <div className="stars-text-rating">Stars</div>
        </div>

        <input
          type="submit"
          className="submit-review-button-modal"
          value="Update Your Review"
          disabled={hasSubmitted && Object.values(errors).length > 0}
        />
      </form> */}
    </div>
  );
}
export default UpdateBookingModal;
