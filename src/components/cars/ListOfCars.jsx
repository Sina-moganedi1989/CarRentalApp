// src/Customers.js or src/ListOfCars.js

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListOfCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars'
        );

        if (response.data.result) {
          setCars(response.data.data);
        } else {
          setError("Failed to fetch cars");
        }
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 style={{color:"red",fontSize:"30px",textAlign:"center", marginTop:"20px"}}>Car List</h2>

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Daily Rate</th>
            <th>Image</th>
            <th>Reg No</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.carId}>
              <td>{car.carId}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>{car.dailyRate}</td>
              <td>
                <img
                  src={car.carImage}
                  alt="Car"
                  width="100"
                  onError={(e) => (e.target.src = "/default-car.png")}
                />
              </td>
              <td>{car.regNo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex gap-2">
        <Button onClick={() => navigate('/CreateCars')} variant="primary">Create Cars</Button>
        <Button onClick={() => navigate('/UpdateCars')} variant="primary">Update Car</Button>
        <Button onClick={() => navigate('/DeleteCars')} variant="primary">Delete Cars</Button>
        <Button onClick={() => navigate('/Dashboard')} variant="primary">Dashboard</Button>


      </div>
      <br />
    </div>
  );
}

export default ListOfCars;
