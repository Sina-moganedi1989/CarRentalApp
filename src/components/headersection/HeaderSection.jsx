import React from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function HeaderSection() {
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selected = e.target.value;

    switch (selected) {
      case 'rent':
        // navigate to rent a car page
        break;
      case 'cars':
        navigate('/ListOfCars')
        break;
      case 'bookings':
        navigate('/ListOfBookings')
        break;
      case 'customers':
        navigate('/ListOfCustomer');
        break;
      default:
        break;
    }
  };
  return (
    <div>
        <Container className="bg-body-tertiary" style={{height:"80px"}}>
          <Row className='w-100 align-items-center' >
            <Col>
            <nav className="my-4">
              <p id='logo'><img src="unnamed.webp" alt="Logo" style={{ width: '10%' }} />
                {' '}Car Rental Company, Drive It!!
              </p>
              </nav>
            </Col>
            <Col className="justify-content-end">
              <nav className="my-4">
              <Link to="/" className='btn btn-link'>Home</Link>

                <Link to="/Promo" className="btn btn-link">Promos</Link>
                <Link to="/SignIn" className="btn btn-link">SignIn</Link>
                <Link to="/CreateCustomer" className="btn btn-link">Register</Link>
              

              </nav>

            </Col>
          </Row>
          <hr />
        </Container>
    </div>
  )
}
