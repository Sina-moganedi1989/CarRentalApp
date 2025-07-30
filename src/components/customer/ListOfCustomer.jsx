// src/Customers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spinner, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ListOfCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCustomers'
        );

        const data = response.data;

        if (data.result && Array.isArray(data.data)) {
          setCustomers(data.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <div>
      <h2 style={{color:"red",fontSize:"30px",textAlign:"center", marginTop:"20px"}}>Customer List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ color: 'blue' }}>ID</th>
            <th style={{ color: 'blue' }}>Name</th>
            <th style={{ color: 'blue' }}>City</th>
            <th style={{ color: 'blue' }}>Mobile</th>
            <th style={{ color: 'blue' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.customerId}>
              <td>{cust.customerId}</td>
              <td>{cust.customerName}</td>
              <td>{cust.customerCity}</td>
              <td>{cust.mobileNo}</td>
              <td>{cust.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ marginTop: '20px' }}>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => navigate('/CreateCustomer')}
          variant="primary"
        >
          Create Customer
        </Button>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => navigate('/UpdateCustomer')}
          variant="primary"
        >
          Update Customer
        </Button>
        <Button style={{ marginRight: '10px' }}
          onClick={() => navigate('/DeleteCustomer')}
          variant="primary"
        >
          Delete Customer
        </Button>
        <Button
          onClick={() => navigate('/Dashboard')}
          variant="primary"
        >
          Dashboard
        </Button>
        
      </div>
      <br />
    </div>
  );
}

export default ListOfCustomer;
