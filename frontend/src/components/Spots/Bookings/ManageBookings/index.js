import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOwnedBookingsThunk } from "../../../../store/booking";
import ManageBookingCard from "./ManageBookingCard";
import "./ManageBookings.css";

const ManageBookings = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllOwnedBookingsThunk());
  }, [dispatch]);

  const allOwnedBookings = useSelector((state) =>
    Object.values(state.bookings)
  );

  return (
    <div className="manage-spots-parent">
      <div className="manage-spots-heading"> Manage Your Bookings</div>
      <div className="manage-spots-container">
        {allOwnedBookings.map((booking) => {
          if (sessionUser && sessionUser.id === booking.userId) {
            return <ManageBookingCard key={booking.id} booking={booking} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ManageBookings;
