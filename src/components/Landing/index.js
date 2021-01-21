import React from 'react';
import SignInPage from '../SignIn';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../images/logo1.png';


const Landing = () => (
  <div className="landingPage">
    <Container>
      <Row>
        <Col sm={6}>
          <SignInPage />
        </Col>
        <Col sm={6}>
          <img
            className="d-block w-2"
            src={Logo}
            alt="next idea logo"
          />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Landing;
