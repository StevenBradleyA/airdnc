import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../SpotDetails/SpotDetails.css";
import { createBookingThunk } from "../../../../store/booking";

function CreateBookingForm({ spotId, start, end }) {
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

  // not sure if this is the correct date info I need to send. lets check our seeders...

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

  const handleInputErrors = () => {
    const errorsObj = {};
    if (startDate.length === 0) {
      errorsObj.startDate = "Must Select a Start Date";
    }
    if (endDate.length === 0) {
      errorsObj.endDate = "Must Select a Start Date";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [startDate, endDate]);

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const newBookingData = {
        startDate: backendDate(startDate),
        endDate: backendDate(endDate),
      };

      dispatch(createBookingThunk(newBookingData, spotId)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors({ booking: data.errors[0] });
        }
      );
    }
    setHasSubmitted(true);
  };

  //   !Need to be able to check booking conflicts!.

  return (
    <div>
      <form onSubmit={handleReserve} className="create-review-form-container">
        {hasSubmitted && errors.review && (
          <p className="errors">{errors.review}</p>
        )}
        {hasSubmitted && errors.stars && (
          <p className="errors">{errors.stars}</p>
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
          disabled={hasSubmitted && Object.values(errors).length > 0}
        >
          <span></span>
          Reserve
        </button>
      </form>
    </div>
  );
}

export default CreateBookingForm;
