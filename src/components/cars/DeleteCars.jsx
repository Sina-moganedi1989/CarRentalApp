
import React, { useState } from 'react';
import axios from 'axios';

const DeleteCars = () => {
  const [carId, setCarId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (event) => {
    event.preventDefault();
    if (!carId) {
      setMessage('Please enter a Car ID.');
      return;
    }

    try {
      const response = await axios.delete(`https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/DeleteCarbyCarId`, {
        params: { carId: carId }
      });

      if (response.data.result) {
        setMessage(`Car with ID ${carId} deleted successfully.`);
        setTimeout(() => {
          navigate("/ListOfCars");
        }, 2000);
      } else {
        setMessage(`Failed to delete car: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Delete Cars</h2>
      <form onSubmit={handleDelete}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="carId" style={{ color: 'blue', fontSize: '20px' }}>
            Car ID:
          </label>
          <br />
          <input
            id="carId"
            type="text"
            placeholder="Enter Car ID"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            autoComplete="off"
          />
        </div>

        <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: 'red', color: 'white' }}>
          Delete Cars
        </button>
        {message && <p style={{ marginTop: '20px',color:'red' }}>{message}</p>}


        
      

        
      </form>
    </div>
  
    )}

export default DeleteCars;

