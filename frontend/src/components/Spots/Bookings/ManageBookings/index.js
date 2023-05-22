import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllOwnedBookingsThunk } from "../../../../store/booking";
import ManageBookingCard from "./ManageBookingCard";
import "./ManageBookings.css";

const ManageBookings = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();




  useEffect(() => {
    dispatch(getAllOwnedBookingsThunk());
  }, [dispatch]);

  const allOwnedBookings = useSelector((state) => Object.values(state.bookings));


  console.log(allOwnedBookings)



  return (
    <div className="manage-spots-parent" >
      <div className="manage-spots-heading"> Manage Your Bookings
        </div>
      <div className="manage-spots-container">
        {allOwnedBookings.map((booking) => {
          if (sessionUser && sessionUser.id === booking.ownerId) {
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
