// Admin.jsx
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Table from './table';
import 'bootstrap/dist/css/bootstrap.min.css';


const Admin = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  //   console.log(startDate)

  const handleGoButtonClick = async () => {
    try {
      setIsFetching(true);

      const startDateFormat = startDate ? startDate.toISOString() : '';
      const endDateFormat = endDate ? endDate.toISOString() : '';

      const response = await fetch(`http://localhost:8000/users/date_range/?start_datetime_str=${startDateFormat}&end_datetime_str=${endDateFormat}`);

      if (!response.ok) {
        console.error(`Error fetching data! HTTP status: ${response.status}`);
        return;
      }

      const result = await response.json();
      console.log('Fetched data:', result);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
    }
  };


  return (
    <div className="">
      <h1 className="mb-4">Admin Page</h1>

      <div className="search">
        <label htmlFor="">From Date: </label>
        <DatePicker

          selectsStart
          selected={startDate}
          onChange={date => setStartDate(date)}
          startDate={startDate}
          endDate={endDate}
          showMonthDropdown
          showYearDropdown
          showTimeInput
        />
        <label htmlFor="">To Date: </label>
        <DatePicker

          selectsEnd
          selected={endDate}
          onChange={date => setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          showMonthDropdown
          showYearDropdown
          showTimeInput
        />
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={handleGoButtonClick} disabled={isFetching}>
            Go
          </button>
        </div>
      </div>
      <div className="table mt-4">
        <Table data={data} />
      </div>
    </div>
  );
};

export default Admin;
