import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState(null);

  const [bookingCount, setBookingCount] = useState(0);
 

  const [customerCount, setCustomerCount] = useState(0);
  const [carData, setCarData] = useState([]);
  const [totalDailyRate, setTotalDailyRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCustomerName(user.customerName);
      setCustomerId(user.customerId);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  // 🚗 Load car data
  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars')
      .then(response => {
        const cars = response.data?.data || [];
        setCarData(cars);
        const totalRate = cars.reduce((sum, car) => sum + (car.dailyRate || 0), 0);
        setTotalDailyRate(totalRate);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setError('Failed to fetch car data');
      })
      .finally(() => setLoading(false));
  }, []);

  // 👤 Load customer count
  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCustomers')
      .then(response => {
        const customers = response.data?.data || [];
        setCustomerCount(customers.length);
       
        
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch customer data');
      });
  }, []);

  // 📋 Load booking data and check if user has a booking
  useEffect(() => {
    if (!customerId) return;

    axios.get('https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookings')
      .then(response => {
        const bookings = response.data?.data || [];
        setBookingCount(bookings.length);

        
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch booking data');
      });
  }, [customerId]);

  // 🎯 Menu select handler
  const handleSelectChange = (e) => {
    const selected = e.target.value;
    switch (selected) {
      case 'cars':
        navigate('/ListOfCars');
        break;
      case 'bookings':
        navigate('/ListOfBookings');
        break;
      case 'customers':
        navigate('/ListOfCustomer');
        break;
      default:
        break;
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ color: 'white' }}>
      <style>{`a:hover { color: brown; }`}</style>

      <br /><br />
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <select onChange={handleSelectChange} className="form-select form-select-lg mb-3">
                <option value="manage">Menu:</option>
                <option value="cars">List of Cars</option>
                <option value="bookings">List of Bookings</option>
                <option value="customers">List of Customers</option>
              </select>
            </div>

            <div className="col-lg-9 col-sm-12 text-center">
              <h1 style={{ color: "green" }}>👋 Welcome, {customerName || "Guest"}!</h1>
              <p><strong>This is your Car Rental dashboard.</strong></p>
             
                <div style={{ marginTop: "20px", color: "#ffcc00" }}>
                  <Button onClick={() => navigate("/BookingByCustomerId")} variant="warning">Open My Booking</Button>
                </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <Card style={{ width: '20rem' }}>
                <Card.Body>
                  <Card.Title>Total No Customers</Card.Title>
                  <Card.Text>
                    <p><strong>Total Customers:</strong> {customerCount}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-lg-4 col-sm-12">
              <Card style={{ width: '20rem' }}>
                <Card.Body>
                  <Card.Title>Total No Cars</Card.Title>
                  <Card.Text>
                    <p><strong>Total Cars:</strong> {carData.length}</p>
                    <p><strong>Total Daily Rate:</strong> R {totalDailyRate.toLocaleString('en-ZA')}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-lg-4 col-sm-12">
              <Card style={{ width: '20rem' }}>
                <Card.Body>
                  <Card.Title>Total No Bookings</Card.Title>
                  <Card.Text>
                    <p><strong>Total Bookings:</strong> {bookingCount}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
</div>
<div>
              <Button style={{ marginTop: "20px", backgroundColor: "#ffcc00", color:"black",border:"none" }} onClick={() => navigate('/CreateNewBooking')} variant="primary">
                Make New Booking
              </Button>
            <br /><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
