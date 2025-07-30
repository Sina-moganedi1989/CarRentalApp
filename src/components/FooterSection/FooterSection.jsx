
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export default function FooterSection() {
  return (
    <footer style={{ paddingTop: '2rem', backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h4>Features</h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: 15, color: 'grey' }}>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Cool stuff</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Random feature</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Team feature</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Stuff for developers</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Another one</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Last time</a></li>
            </ul>

            <h4>About</h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: 15, color: 'grey' }}>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Team</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Location</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Privacy</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Terms</a></li>
            </ul>
          </Col>

          <Col xs={12} md={6}>
            <h4>Resources</h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: 15, color: 'grey' }}>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Resource name</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Another resource</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'grey' }}>Final resource</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
