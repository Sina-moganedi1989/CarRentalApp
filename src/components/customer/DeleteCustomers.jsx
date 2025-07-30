import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteCustomers = () => {
  const [customerId, setCustomerId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!customerId.trim()) {
      setError('Customer ID is required.');
      setResponse(null);
      return;
    }

    try {
      const res = await axios.delete(
        `https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/DeletCustomerById`,
        {
          params: { id: customerId },
          headers: {
            Accept: 'text/plain',
          },
        }
      );

      const message = typeof res.data === 'string' ? res.data : res.data.message;
      setResponse({ message });
      setError(null);
      setCustomerId('');

      setTimeout(() => {
        navigate('/ListOfCustomer');
      }, 2000);
    } catch (err) {
      console.error(err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Error deleting customer. Please try again.';
      setError(errMsg);
      setResponse(null);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Delete Customer</h2>
      <form onSubmit={handleDelete}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="customerId" style={{ color: 'blue', fontSize: '20px' }}>
            Customer ID:
          </label>
          <br />
          <input
            id="customerId"
            type="text"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            autoComplete="off"
          />
        </div>

        <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: 'red', color: 'white' }}>
          Delete Customer
        </button>

        {response && (
          <div style={{ marginTop: '20px', color: 'green' }}>
            <strong>Success:</strong> {response.message}
          </div>
        )}

        {error && (
          <div style={{ marginTop: '20px', color: 'red' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default DeleteCustomers;
