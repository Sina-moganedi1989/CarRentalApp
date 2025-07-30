import { useState } from 'react';
import './App.css';
import Promo from './components/booking/Promo';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateCustomer from './components/customer/UpdateCustomer';
import DefaultLayout from './components/dashboard/DefaultLayout';
import WrongPath from './components/dashboard/WrongPath';
import Home from './components/Home';
import ListOfBookings from './components/booking/ListOfBookings';
import CreateCustomer from './components/customer/CreateCustomer';
import DeleteCustomers from './components/customer/DeleteCustomers';
import ListOfCars from './components/cars/ListOfCars';
import ListOfCustomer from './components/customer/ListOfCustomer';
import DeleteCars from './components/cars/DeleteCars';
import UpdateCars from './components/cars/UpdateCars';
import BookingsByBookingId from './components/booking/BookingsByBookingId';
import BookingsByCustomerId from './components/booking/BookingByCustomerId';
import CreateNewBooking from './components/booking/CreateNewBooking';
import DeleteBooking from './components/booking/DeleteBooking';
import FilterBooking from './components/booking/FilterBooking';
import CreateCars from './components/cars/CreateCars';
import SignIn from './components/SignIn';







function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <div className='container'>

            <Routes>
              <Route path="*" element={<WrongPath />} />
              <Route element={<DefaultLayout />}>

                <Route path="/" element={<Home />} />
              </Route>

              <Route element={<DefaultLayout />}>
                <Route path="/Dashboard" element={<Dashboard />} />
              </Route>
              
              <Route element={<DefaultLayout />}>
                <Route path="/CreateCars" element={<CreateCars />} />
              </Route>
              <Route element={<DefaultLayout />}>
                <Route path="/UpdateCars" element={<UpdateCars />} />
              </Route><Route element={<DefaultLayout />}>
                <Route path="/DeleteCars" element={<DeleteCars />} />
              </Route>
              <Route element={<DefaultLayout />}>
                <Route path="/ListOfCars" element={<ListOfCars />} />
              </Route>
              <Route element={<DefaultLayout />}>
                <Route path="/CreateCustomer" element={<CreateCustomer />} />
              </Route>
              <Route element={<DefaultLayout />}>

                <Route path="/ListOfCustomer" element={<ListOfCustomer />} />
              </Route>
              <Route element={<DefaultLayout />}>

                <Route path="/DeleteBooking" element={<DeleteBooking />} />
              </Route>
              <Route element={<DefaultLayout />}>
                <Route path="/FilterBooking" element={<FilterBooking />} />
              </Route>
              <Route element={<DefaultLayout />}>
                <Route path="/ListOfBookings" element={<ListOfBookings />} />
              </Route>
              <Route element={<DefaultLayout />}>
                <Route path="/UpdateCustomer" element={<UpdateCustomer />} />
              </Route>
              <Route element={<DefaultLayout />}>

                <Route path="/DeleteCustomer" element={<DeleteCustomers />} />
              </Route>
              <Route element={<DefaultLayout />}>

                <Route path="/Promo" element={<Promo />} />
              </Route>
              <Route element={<DefaultLayout />}>

                <Route path="/BookingById" element={<BookingsByBookingId />} />
              </Route>
              <Route element={<DefaultLayout />}>

                <Route path="/BookingByCustomerId" element={<BookingsByCustomerId />} />
              </Route><Route element={<DefaultLayout />}>

                <Route path="/CreateNewBooking" element={<CreateNewBooking />} />
              </Route>
              <Route element={<DefaultLayout />}>

                <Route path="/Header" element={<UpdateCustomer />} />
              </Route>
              <Route element={<DefaultLayout />}>

                <Route path="/SignIn" element={<SignIn />} />
              </Route>
           
            </Routes>
           

          </div>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
