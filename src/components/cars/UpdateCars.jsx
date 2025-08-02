import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateCars = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    CarId: '',
    Brand: '',
    Model: '',
    Year: '',
    Color: '',
    DailyRate: '',
    CarImage: '',
    RegNo: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const res = await axios.put(
        'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/UpdateCar',
        car,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setResponseMessage(res.data.Message || 'Car updated successfully!');
      setTimeout(() => {
        navigate('/ListOfCars');
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.error("Update error:", error.response.data);
        alert("Server Error: " + JSON.stringify(error.response.data, null, 2));
        setResponseMessage('Error updating car: ' + (error.response.data.Message || 'Check server response'));
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server.");
        setResponseMessage("No response from server.");
      } else {
        console.error("Request setup error:", error.message);
        alert("Request Error: " + error.message);
        setResponseMessage("Error: " + error.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Update Cars</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor='CarId' style={{color:"blue",fontSize:"20px"}}>Car ID:</label>
          <input type="number" name='CarId' value={car.CarId} onChange={handleChange} required   style={{ width: "100%", padding: "8px" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor='Brand' style={{color:"blue",fontSize:"20px"}}>Brand:</label>
          <input type="text" name='Brand' value={car.Brand} onChange={handleChange} required   style={{ width: "100%", padding: "8px" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor='Model' style={{color:"blue",fontSize:"20px"}}>Model:</label>
          <input 
          type="text" 
          name='Model' 
          value={car.Model} 
          onChange={handleChange} 
          required
          style={{ width: "100%", padding: "8px" }}
           />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor='Year' style={{color:"blue",fontSize:"20px"}}>Year:</label>
          <input type="number" name='Year' value={car.Year} onChange={handleChange} required  style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor='Color' style={{color:"blue",fontSize:"20px"}}>Color:</label>
          <input type="text" name='Color' value={car.Color} onChange={handleChange} required  style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor='DailyRate' style={{color:"blue",fontSize:"20px"}}>Daily Rate:</label>
          <input type="number" name='DailyRate' value={car.DailyRate} onChange={handleChange} required  style={{ width: "100%", padding: "8px" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor='CarImage' style={{color:"blue",fontSize:"20px"}}>Car Image URL:</label>
          <input type="text" name='CarImage' value={car.CarImage} onChange={handleChange} required  style={{ width: "100%", padding: "8px" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor='RegNo' style={{color:"blue",fontSize:"20px"}}>Registration No:</label>
          <input type="text" name='RegNo' value={car.RegNo} onChange={handleChange} required  style={{ width: "100%", padding: "8px" }}/>
        </div>

        <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor: "red", marginBottom: "10px" }}>
          Update Car
        </button>
        <button type="button" style={{ padding: "10px", width: "100%", backgroundColor: "red" }} onClick={() => navigate('/ListOfCars')}>
          List of Cars
        </button>
      </form>
      {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}

    </div>
  );
};

export default UpdateCars;
