import React, { useEffect, useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CalendarDateRange = ({ currentSpot }) => {
  const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    color: "#000000",
  };

  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={handleSelect}
    />
  );
};

export default CalendarDateRange;
