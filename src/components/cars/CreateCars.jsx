import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCars() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    CarId: 0,
    Brand: '',
    Model: '',
    Year: new Date().getFullYear(),
    Color: '',
    DailyRate: 0,
    CarImage: '',
    RegNo: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "CarImage") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          CarImage: reader.result, // base64 string
        }));
      };
      if (files && files[0]) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCar',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        setMessage('Car added successfully!');
        setFormData({
          CarId: 0,
          Brand: '',
          Model: '',
          Year: new Date().getFullYear(),
          Color: '',
          DailyRate: 0,
          CarImage: '',
          RegNo: ''
        });
        setTimeout(() => {
          navigate('/CreateCars');
        }, 2000);
      } else {
        setMessage('Failed to add car. Server error.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add car. Network error.');
    }
  };
  

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
        <h2>Add New Car</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue", fontSize:"20px"}}> Car ID:</label><br />
            <input
              type="number"
              required
              name='CarId'
              value={formData.CarId}
              onChange={handleChange}
              placeholder="Enter ID"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue",fontSize:"20px"}}>Brand:</label><br />
            <input
              type="text"
              name='Brand'
              required
              value={formData.Brand}
              onChange={handleChange}
              placeholder="Enter Brand"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue",fontSize:"20px"}}>Model:</label><br />
            <input
              type="text"
              name='Model'
              required
              value={formData.Model}
              onChange={handleChange}
              placeholder="Enter Model"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue",fontSize:"20px"}}>Year:</label><br />
            <input
              type="text"
              name='Year'
              required
              value={formData.Year}
              onChange={handleChange}
              placeholder="Enter Year"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue",fontSize:"20px"}}>Color:</label><br />
            <input
              type="text"
              name='Color'
              required
              value={formData.Color}
              onChange={handleChange}
              placeholder="Enter Color"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue",fontSize:"20px"}}>DailyRate:</label><br />
            <input
              type="number"
              name='DailyRate'
              required
              value={formData.DailyRate}
              onChange={handleChange}
              placeholder="Enter DailyRate"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue",fontSize:"20px"}}>Car Image:</label><br />
            <input
              type="file"
              name='CarImage'
              required
              accept='image/*'
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          
          <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor:"red", marginBottom:"10px"}}>
            Add Car
          </button>
          <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor:"red" }} onClick={() => navigate('/ListOfCars')}>
            List of Cars
          </button>
        </form>
      
      </div>
  );
}

export default CreateCars;

