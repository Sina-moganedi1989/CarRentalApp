
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const formatDate = (dateStr) => {

  const date = new Date(dateStr);
  return date.toISOString().split('T')[0]; // "2025-07-16"
};


const CreateNewBooking = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
  CustomerName: "",
  CustomerCity:"",
  MobileNo: "",
  Email: "",
  BookingId: 0,
  CarId:0,
  BookingDate:"",
  Discount: 0,
  TotalBillAmount: 0,
  });

  const [resultMessage, setResultMessage] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResultMessage('');
    setCreatedBooking(null);
    setLoading(true);
  
    try {
      const response = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewBooking',
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
  
      const result = response.data;
      setLoading(false);
  
      if (result.result) {
        setResultMessage(result.message);
        setCreatedBooking(result.data);
        console.log("Booking created:", JSON.stringify(result.data, null, 2));
  
        // Navigate after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setResultMessage('Booking failed: ' + result.message);
      }
    } catch (err) {
      console.error('Booking Error:', err);
      setLoading(false);
      setResultMessage('Error occurred while creating booking.');
    }
  };
  


  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
    <h2>Create Booking</h2>
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue", fontSize:"20px"}}>Customer Name:</label><br />
        <input
          type="text"
          required
          name='CustomerName'
          value={formData.CustomerName}
          onChange={handleChange}
          placeholder="Enter Name"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>Customer City:</label><br />
        <input
          type="text"
          name='CustomerCity'
          required
          value={formData.CustomerCity}
          onChange={handleChange}
          placeholder="Enter City"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>Mobile No:</label><br />
        <input
          type="tel"
          name='MobileNo'
          required
          value={formData.MobileNo}
          onChange={handleChange}
          placeholder="Enter Mobileno"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>Email:</label><br />
        <input
          type="email"
          name='Email'
          required
          value={formData.Email}
          onChange={handleChange}
          placeholder="Enter Email"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>Booking Id:</label><br />
        <input
          type="number"
          name='BookingId'
          required
          value={formData.BookingId}
          onChange={handleChange}
          placeholder="Enter Booking Id"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>Car Id:</label><br />
        <input
          type="number"
          name='CarId'
          required
          value={formData.CarId}
          onChange={handleChange}
          placeholder="Enter Car ID"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>Booking Date:</label><br />
        <input
          type="date"
          name='BookingDate'
          required
          value={formData.BookingDate}
          onChange={handleChange}
          placeholder="Enter Booking Date"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>Discount:</label><br />
        <input
          type="number"
          name='Discount'
          required
          value={formData.Discount}
          onChange={handleChange}
          placeholder="Enter Discount"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>Total Bill Amount:</label><br />
        <input
          type="number"
          name='TotalBillAmount'
          required
          value={formData.TotalBillAmount}
          onChange={handleChange}
          placeholder="Enter Total Bill Amount"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      
      <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor:"red", marginBottom:"10px"}}>
        Create Booking
      </button>
      <button type="button" style={{ padding: "10px", width: "100%", backgroundColor:"red" }} onClick={() => navigate('/Dashboard')}>
        Go to Dashboard
      </button>
    </form>
    {loading && <p>Creating booking....</p>}
    {createdBooking && (
  <div style={{ marginTop: "20px", color: "green" }}>
    <h4>Booking Created Successfully!</h4>
    <pre>{JSON.stringify(createdBooking, null, 2)}</pre>
  </div>
)}

  </div>
  );
};

export default CreateNewBooking;
