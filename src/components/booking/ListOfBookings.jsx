import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ListOfBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookings'
        );
        setBookings(response.data.data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch booking data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="loading">Loading booking records...</div>;
  if (error) return <div className="error">{error}</div>;
  if (bookings.length === 0) return <div style={{color:"white"}}>No booking records found.</div>;

  return (
    <div>
      <p style={{color:"red",fontSize:"30px",textAlign:"center"}}>List Of Bookings</p>
      <table className="table table-striped table-bordered booking-table">
        <thead>
          <tr style={{ color: "white" }}>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Mobile</th>
            <th>Car Brand</th>
            <th>Model</th>
            <th>Discount</th>
            <th>Total Bill</th>
            <th>Booking UID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId} style={{ color: "white" }}>
              <td>{booking.bookingId}</td>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>{booking.customerName}</td>
              <td>{booking.mobileNo}</td>
              <td>{booking.brand}</td>
              <td>{booking.model}</td>
              <td>{booking.discount}</td>
              <td>{booking.totalBillAmount}</td>
              <td>{booking.bookingUid}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <Button onClick={() => navigate('/CreateNewBooking')} variant="primary" style={{ marginRight: '10px' }}>
        Create New Booking
      </Button>
      <Button onClick={() => navigate('/BookingByCustomerId')} variant="primary" style={{ marginRight: '10px' }}>
        Get Booking CustomerId
      </Button>
      <Button onClick={() => navigate('/BookingById')} variant="primary" style={{ marginRight: '10px' }}>
        GetBooking by BookingId
      </Button>
      <Button onClick={() => navigate('/FilterBooking')} variant="primary" style={{ marginRight: '10px' }}>
        Filter Booking
      </Button>
      <Button onClick={() => navigate('/DeleteBooking')} variant="primary" style={{ marginRight: '10px' }}>
        Delete Booking
      </Button>
      <br /><br />
    </div>
    
  );
}

export default ListOfBookings;
