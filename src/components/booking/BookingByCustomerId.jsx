import React, { useState } from 'react';
import axios from 'axios';

const BookingsByCustomerId = () => {
  const [custId, setCustomerId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!custId.trim()) {
      setMessage('Please enter a customer ID');
      return;
    }

    setLoading(true);
    setMessage('');
    setBookings([]);

    try {
      const response = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookingsByCustomerId',
        {
          params: { custId },
          headers: { Accept: 'text/plain' },
        }
      );

      const result = response.data;

      if (result.result && result.data && result.data.length > 0) {
        setBookings(result.data);

        setTimeout(() => {
          navigate('/Dashboard');
        }, 2000);
      } else {
        setMessage('No bookings found for this customer.');
      }
    } catch (error) {
      setMessage(`Failed to fetch bookings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>By Customer ID</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchBookings();
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="custId" style={{ color: 'blue', fontSize: '20px' }}>
            Customer ID:
          </label>
          <br />
          <input
            type="text"
            id="custId"
            placeholder="Enter Customer ID"
            value={custId}
            onChange={(e) => setCustomerId(e.target.value)}
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

      {bookings.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ color: 'red' }}>Booking Details</h3>
          <ul>
            {bookings.map((booking, index) => (
              <li key={index} style={{ marginBottom: '10px', backgroundColor: '#f4f4f4', padding: '10px' }}>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {JSON.stringify(booking, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingsByCustomerId;
