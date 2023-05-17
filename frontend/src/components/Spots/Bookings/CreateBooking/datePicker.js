import React, { useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';



const DatePicker = () => {
    const [value, onChange] = useState(new Date());



  return (
    <><div>   <DatePicker onChange={onChange} value={value} /></div></>
  );
};

export default DatePicker;
