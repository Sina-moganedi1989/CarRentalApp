import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCustomer() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        CustomerId: 0,
        CustomerName: '',
        CustomerCity: '',
        MobileNo: '',
        Email: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCustomer',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setMessage('Customer added successfully!');
                setFormData({
                    CustomerId: "",
                    CustomerName: '',
                    CustomerCity: '',
                    MobileNo: '',
                    Email: ''
                });
                 // Navigate after 2 seconds
            setTimeout(() => {
                navigate("/SignIn");
              }, 2000);
            } else {
                setMessage('Failed to add customer. Server error.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to add customer. Network error.');
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
        <h2>New Customer</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue", fontSize:"20px"}}>ID:</label><br />
            <input
              type="number"
              required
              name='CustomerId'
              value={formData.CustomerId}
              onChange={handleChange}
              placeholder="Enter ID"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue",fontSize:"20px"}}>Name:</label><br />
            <input
              type="text"
              name='CustomerName'
              required
              value={formData.CustomerName}
              onChange={handleChange}
              placeholder="Enter Name"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{color:"blue",fontSize:"20px"}}>City:</label><br />
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
          <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor:"red", marginBottom:"10px"}}>
            Add Customer
          </button>
          <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor:"red" }} onClick={() => navigate('/Dashboard')}>
            Go to Dashboard
          </button>
        </form>
        {message && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>}
      </div>
    )   
    };
export default CreateCustomer;
