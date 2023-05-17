import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";

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
    key: "selection",
    color: "black",
    // rangeColors: "black",
  };
  return (
    <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} months={2}  direction="horizontal" showDefinedRanges={false}/>
  );
};

export default CalendarDateRange;
