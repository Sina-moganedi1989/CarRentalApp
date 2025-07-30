import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Promo.css';
import { Col, Row} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


export default function Promo() {
  const navigate = useNavigate();
  return (
    
    
    <div className="container mt-4" >
      <Row>
        <Col xs={12} md={6}>
              <h2>
              Make the most of your car hire
              </h2>
          </Col>
      </Row>
      <br />
      <br />
      <div className="row">
        <div className="col-md-4 mb-4">
          <div >
            <div>
            <Card>
            <Card.Img variant="top" src="harrier.jpg" />
            <Card.Body>
              <Card.Title>R25000 /Month</Card.Title>
              <Card.Text>
                <button onClick={() => navigate('/CreateNewBooking')} >BOOK NOW</button>
              </Card.Text>
            </Card.Body>
          </Card>

            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div>
            <div>
            <Card>
            <Card.Img variant="top" src="bmw.jpeg" />
            <Card.Body>
              <Card.Title>R25000 /Month</Card.Title>
              <Card.Text>
                <button onClick={() => navigate('/CreateNewBooking')}>BOOK NOW</button>
              </Card.Text>
            </Card.Body>
          </Card>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div>
            <div>
            <Card>
            <Card.Img variant="top" src="mahindra.jpg" />
            <Card.Body>
              <Card.Title>R30000 /Month</Card.Title>
              <Card.Text>
                <button onClick={() => navigate('/CreateNewBooking')}>BOOK NOW</button>
              </Card.Text>
            </Card.Body>
          </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div >
            <div>
            <Card>
            <Card.Img variant="top" src="fordranger.jpeg" />
            <Card.Body>
              <Card.Title>R25000 /Month</Card.Title>
              <Card.Text>
                <button onClick={() => navigate('/CreateNewBooking')} >BOOK NOW</button>
              </Card.Text>
            </Card.Body>
          </Card>

            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div>
            <div>
            <Card>
            <Card.Img variant="top" src="fordEco.jpeg" />
            <Card.Body>
              <Card.Title>R25000 /Month</Card.Title>
              <Card.Text>
                <button onClick={() => navigate('/CreateNewBooking')}>BOOK NOW</button>
              </Card.Text>
            </Card.Body>
          </Card>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div>
            <div>
            <Card>
            <Card.Img variant="top" src="NexonTata.avif" />
            <Card.Body>
              <Card.Title>R30000 /Month</Card.Title>
              <Card.Text>
                <button onClick={() => navigate('/CreateNewBooking')}>BOOK NOW</button>
              </Card.Text>
            </Card.Body>
          </Card>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
