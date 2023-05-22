import React, { useEffect, useState } from "react";
import "react-date-range/dist/theme/default.css"; // theme css file
import "./calendar.css";

import { DateRangePicker } from "react-date-range";
// import { DateRangePicker } from "react-date-range";







const CalendarDateRange = ({ currentSpot, allBookings }) => {
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "black",
  });

  const handleSelect = (ranges) => {
    setSelectedRange(ranges.selection);
  };



  // ! old
  // const handleSelect = (ranges) => {
  //   console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  // };

  // const selectionRange = {
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: "selection",
  //   color: "black",
  // }
  // !old 


  const disabledDates = allBookings.map((booking) => {
    return {
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      key: booking.id,
      color: "red",
    };
  });


  return (
    <div>
    <DateRangePicker
      ranges={[selectedRange]}
      onChange={handleSelect}
      months={2}
      direction="horizontal"
      disabledDates={disabledDates}
    />
    <div>
    Selected Start Date: {selectedRange.startDate.toDateString()}
  </div>
  <div>Selected End Date: {selectedRange.endDate.toDateString()}</div>
</div>
  );
};

export default CalendarDateRange;
