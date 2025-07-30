
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Promo from "./booking/Promo";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="container-fluid">
        <div className="drop">
        <Dropdown>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
        <br /><br />
    <div className="container">
        <div className="row">
            <div className="col-lg-6 col-sm-12 p-3">
        
            <h1 className="text-danger">Rent a Car</h1>
            <h4 className="text-primary">start driving </h4>
              <p className="card-text" style={{ color: 'white' }}><br /> Car hire for any kind of trip
              Great cars at great prices, from the biggest car rental company.
              Explore more options to hire a car for cheap, come for test drive with us, </p>  
             <a href="#" className="btn btn-danger" onClick={() => navigate('/CreateCustomer')}>Register now</a>
                

            </div>
            <div className="col-lg-6 col-sm-12">

                <img src="redcar.jpg" className="img-fluid" alt="logo" style={{width:"100%"}}></img>
            </div>
            </div>
            </div>
            <br />
            <br />
            <Promo/>
            </div>
    
  );
}
