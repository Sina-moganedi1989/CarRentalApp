
import React, { useState } from 'react';

const DeleteBooking = () => {
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('black');

  const handleDelete = async () => {
    if (!bookingId.trim()) {
      setMessage('Please enter a booking ID.');
      setColor('red');
      return;
    }

    const url = `https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/DeletBookingById?id=${bookingId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.result) {
        setMessage('Booking deleted successfully.');
        setColor('green');
      } else {
        setMessage(`Error: ${result.message}`);
        setColor('red');
      }
    } catch (error) {
      setMessage('Network or server error.');
      setColor('red');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
    <h2>Delete Booking</h2>
    <form onSubmit={handleDelete}>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="bookingId" style={{ color: 'blue', fontSize: '20px' }}>
          Booking ID:
        </label>
        <br />
        <input
         type="text"
         id="bookingId"
         value={bookingId}
         onChange={(e) => setBookingId(e.target.value)}
         placeholder="Enter Booking ID"
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          autoComplete="off"
        />
      </div>

      <button  onClick={handleDelete} style={{ padding: '10px', width: '100%', backgroundColor: 'red', color: 'white' }}>
        Delete Booking
      </button>
      {message && <p style={{ marginTop: '20px',color:'red' }}>{message}</p>}
      
    </form>
  </div>

    
  );
};

export default DeleteBooking;
