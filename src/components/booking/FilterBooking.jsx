import React, { useState } from 'react';
import axios from 'axios';

const FilterBooking = () => {
  const [form, setForm] = useState({
    MobileNo: '',
    CustomerName: '',
    CarId: 0,
    FromBookingDate: '',
    ToBookingDate: '',
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Build filter payload
      const filterPayload = {
        ...(form.MobileNo && { MobileNo: form.MobileNo }),
        ...(form.CustomerName && { CustomerName: form.CustomerName }),
        ...(form.CarId && form.CarId > 0 && { CarId: parseInt(form.CarId) }),
        ...(form.FromBookingDate && {
          FromBookingDate: new Date(form.FromBookingDate).toISOString(),
        }),
        ...(form.ToBookingDate && {
          ToBookingDate: new Date(form.ToBookingDate).toISOString(),
        }),
      };
  
      // Step 1: Call FilterBookings
      const filterResponse = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/FilterBookings',
        filterPayload,
        {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json-patch+json',
          },
        }
      );
  
      const filteredData = filterResponse.data?.data || [];
  
      if (filteredData.length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }
  
      // Step 2: Call Get All Bookings
      const allBookingsResponse = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookings',

        {
          headers: {
            'accept': 'text/plain',
          },
        }
      );
  
      const allBookings = allBookingsResponse.data?.data || [];
  
      // Step 3: Match filtered data with full bookings
      const matchedResults = allBookings.filter((booking) =>
        filteredData.some(
          (filtered) =>
            booking.CarId === filtered.CarId &&
            booking.CustomerName === filtered.CustomerName &&
            booking.MobileNo === filtered.MobileNo
        )
      );
  
      setResults(matchedResults);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
    setLoading(false);
  };
  
  
  return (

    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
    <h2>Filter Booking</h2>
    <form>
    <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue", fontSize:"20px"}}>Mobile No:</label><br />
        <input
          type="text"
          name='MobileNo'
          required
          value={form.MobileNo}
          onChange={handleChange}
          placeholder="Enter MobileNo"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue", fontSize:"20px"}}>Customer Name:</label><br />
        <input
          type="text"
          name='CustomerName'
          required
          value={form.CustomerName}
          onChange={handleChange}
          placeholder="Enter Customer Name"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue", fontSize:"20px"}}>Car Id:</label><br />
        <input
          type="number"
          name='CarId'
          required
          value={form.CarId}
          onChange={handleChange}
          placeholder="Enter Id"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue", fontSize:"20px"}}>FromBookingDate:</label><br />
        <input 
        id="FromBookingDate"
         name="FromBookingDate" 
         type="datetime-local"
          value={form.FromBookingDate} 
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{color:"blue",fontSize:"20px"}}>ToBookingDate:</label><br />
        <input
         id="ToBookingDate"
          name="ToBookingDate" 
          type="datetime-local"
           value={form.ToBookingDate} 
           onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <button type="button" onClick={fetchBookings} disabled={loading} style={{ padding: "10px", width: "100%", backgroundColor:"red" }}>
      {loading ? 'Loading...' : 'Filter'}
      </button>
      <br />
      <br />
    </form>


      {results.length === 0 ? (
        <p></p>
      ) : (
        <div >
        <table style={{ cellPadding:'8', maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
          <thead style={{color:"white"}}>
            <tr>
              <th>Booking ID</th>
              <th>Customer Name</th>
              <th>Mobile No</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Discount</th>
              <th>Total Amount </th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody style={{color:"white"}}>
            {results.map((booking, index) => (
              <tr key={index}>
                <td>{booking.bookingId || '-'}</td>
                <td>{booking.customerName || '-'}</td>
                <td>{booking.mobileNo || '-'}</td>
                <td>{booking.brand || '-'}</td>
                <td>{booking.model || '-'}</td>
                <td>{booking.discount || '-'}</td>
                <td>{booking.totalBillAmount || '-'}</td>
                <td>{booking.bookingDate || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <br />
    </div>
  );
};

export default FilterBooking;

