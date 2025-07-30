import React, { useState } from 'react';
import axios from 'axios';

const BookingsByBookingId = () => {
  const [bookingId, setBookingId] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBooking = async (e) => {
    e.preventDefault();

    if (!bookingId.trim()) {
      setMessage('Please enter a valid Booking ID');
      return;
    }

    setLoading(true);
    setBookingData(null);
    setMessage('');

    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/GetBookingByBookingId`,
        {
          params: { bookingId },
          headers: {
            Accept: 'text/plain'
          }
        }
      );

      const result = response.data;
      setLoading(false);

      if (result.result && result.data) {
        setBookingData(result.data);
      } else {
        setMessage(result.message || 'No booking found');
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || 'Error fetching booking');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Get Booking by ID</h2>
      <form onSubmit={fetchBooking}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="bookingId" style={{ color: 'blue', fontSize: '20px' }}>
            Booking ID:
          </label>
          <br />
          <input
            type="text"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            placeholder="Enter Booking ID"
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          style={{ padding: '10px', width: '100%', backgroundColor: 'red', color: 'white' }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Booking'}
        </button>
      </form>

      {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}

      {bookingData && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ color: 'red' }}>Booking Details</h3>
          <pre style={{ color: 'black', backgroundColor: '#f4f4f4', padding: '10px' }}>
            {JSON.stringify(bookingData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BookingsByBookingId;
