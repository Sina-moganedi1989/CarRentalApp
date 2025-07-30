import React from 'react'
import { Link} from 'react-router-dom';


export default function WrongPath() {
  return (
    <div>
        <h1>this page is invalid</h1>
       <Link to="/Dashboard" className="btn btn-link">click here to return Home</Link>
    
    </div>
  )
}




