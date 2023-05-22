import React, { useEffect, useState } from "react";
import "react-date-range/dist/theme/default.css";
import "./calendar.css";

import { DateRangePicker } from "react-date-range";

const CalendarDateRange = ({ currentSpot, allBookings, onDateRangeSelect }) => {
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "black",
  });

  const handleSelect = (ranges) => {
    setSelectedRange(ranges.selection);
    const { selection } = ranges;
    onDateRangeSelect(selection.startDate, selection.endDate);
  };

  const disabledDates = allBookings.flatMap((booking) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const disabledDatesInRange = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      disabledDatesInRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return disabledDatesInRange;
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
    </div>
  );
};

export default CalendarDateRange;
