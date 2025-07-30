import React, { useState } from 'react';
import axios from 'axios';

function UpdateCustomer() {
  const [customer, setCustomer] = useState({
    CustomerId: '',
    CustomerName: '',
    CustomerCity: '',
    MobileNo: '',
    Email: ''
  });

  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/UpdateCustomer',
        customer,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMessage('Customer updated successfully!');
      console.log(response.data);
      setTimeout(() => {
        navigate('/ListOfCustomer');
      }, 2000);
    } catch (error) {
      console.error('Error updating customer:', error);
      setMessage('Failed to update customer. Please check console for details.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>UPDATE CUSTOMER</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ color: "blue", fontSize: "20px" }}>ID:</label><br />
          <input
            type="number"
            required
            name='CustomerId'
            value={customer.CustomerId}
            onChange={e => setCustomer({ ...customer, CustomerId: e.target.value })}
            placeholder="Enter ID"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ color: "blue", fontSize: "20px" }}>Name:</label><br />
          <input
            type="text"
            required
            name='CustomerName'
            value={customer.CustomerName}
            onChange={e => setCustomer({ ...customer, CustomerName: e.target.value })}
            placeholder="Enter Name"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ color: "blue", fontSize: "20px" }}>City:</label><br />
          <input
            type="text"
            name='CustomerCity'
            required
            value={customer.CustomerCity}
            onChange={e => setCustomer({ ...customer, CustomerCity: e.target.value })}
            placeholder="Enter City"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ color: "blue", fontSize: "20px" }}>Email:</label><br />
          <input
            type="email"
            required
            name='Email'
            value={customer.Email}
            onChange={e => setCustomer({ ...customer, Email: e.target.value })}
            placeholder="Enter email"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ color: "blue", fontSize: "20px" }}>Mobile No:</label><br />
          <input
            type="tel"
            name='MobileNo'
            required
            value={customer.MobileNo}
            onChange={e => setCustomer({ ...customer, MobileNo: e.target.value })}
            placeholder="Enter mobile number"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor: "red", color: "white" }}>
          Update
        </button>
      </form>
      {message && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}

export default UpdateCustomer;
