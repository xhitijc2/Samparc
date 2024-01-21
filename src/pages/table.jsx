// Table.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Table = ({ data }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Patient First Name</th>
          <th>Patient Last Name</th>
          <th>Campaigner</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Hospital</th>
          <th>Amount</th>
          <th>Aadhar Number</th>
          <th>Story</th>
          <th>Disease</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.type_of}</td>
            <td>{item.patientFname}</td>
            <td>{item.patientLname}</td>
            <td>{item.campaigner}</td>
            <td>{item.mobile}</td>
            <td>{item.email}</td>
            <td>{item.hospital}</td>
            <td>{item.amount} Rs.</td>
            <td>{item.aadharnumber}</td>
            <td>{item.story}</td>
            <td>{item.disease}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
