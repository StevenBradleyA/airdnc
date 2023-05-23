import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../SpotDetails/SpotDetails.css";
import { createBookingThunk } from "../../../../store/booking";

function CreateBookingForm({ spotId, allBookings, start, end }) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const reserveButtonRef = useRef("pog");

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

  const sessionUser = useSelector((state) => state.session.user);

  const handleMouseMove = (e) => {
    const button = reserveButtonRef.current;
    const outline = button.getBoundingClientRect();
    const x = e.clientX - outline.left;
    const y = e.clientY - outline.top;
    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  };

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

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

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const formattedStart = backendDate(startDate);
      const formattedEnd = backendDate(endDate);
      const newBookingData = {
        spotId,
        startDate: formattedStart,
        endDate: formattedEnd,
      };

      dispatch(createBookingThunk(spotId, newBookingData));
    }
    setHasSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleReserve} className="create-review-form-container">
        {hasSubmitted && errors.startDate && (
          <div className="errors">{errors.startDate}</div>
        )}
        {hasSubmitted && errors.endDate && (
          <div className="errors">{errors.endDate}</div>
        )}
        {hasSubmitted && errors.user && (
          <div className="errors">{errors.user}</div>
        )}
        <div className="create-booking-input-container">
          <div className="left-booking-start">
            <div className="booking-input-subtext">CHECK-IN</div>
            <input
              type="text"
              value={startDate}
              className="booking-date-input"
              placeholder="Start date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="right-booking-end">
            <div className="booking-input-subtext">CHECKOUT</div>

            <input
              type="text"
              value={endDate}
              className="booking-date-input"
              placeholder="End date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="booking-date-input-lower">
          <span className="lower-calendar-text">
            Use the Calendar to select a Date
          </span>
        </div>
        <button
          ref={reserveButtonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            reserveButtonRef.current.style.setProperty("--x", "0px");
            reserveButtonRef.current.style.setProperty("--y", "0px");
          }}
          className="reserve-button"
          type="submit"
          disabled={
            hasSubmitted && !sessionUser && Object.values(errors).length > 0
          }
        >
          <span></span>
          Reserve
        </button>
      </form>
    </div>
  );
}

export default CreateBookingForm;
