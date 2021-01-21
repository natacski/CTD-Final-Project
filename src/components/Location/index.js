import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import {
  InputGroup,
  FormControl,
  Button,
  Col,
  Row,
  ListGroup,
  Container,
} from 'react-bootstrap';

const LocationPage = () => {
   // Declare a new state variables
  const [zipCode, setZipCode] = useState('');
  const [projectDataByZip, setProjectDataByZip] = useState({});

  //getting data by zipcode
  const getZipCodeData = async () => {
    let url = process.env.REACT_APP_NEW_PROJECT_DATA + "&filterByFormula=({zipcode}='" +
      zipCode +
      "')"; //.env variables filter by zipcode
    const response = await fetch(url);
    const zipCodeData = await response.json();
    setProjectDataByZip(zipCodeData);
  };

  return (
    <div style={{ margin: 30 }}>
      <div className="location-title">Location</div>
      <Container>
        <Row>
          <Col xs={4} md={2}></Col>
          <Col xs={12} md={8}>
            <h5>Find projects by zip code here</h5>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Zip Code"
                aria-label="Zip Code"
                aria-describedby="basic-addon2"
                 // Getting zipcode values
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
              />
              <InputGroup.Append>
                <Button
                //Setting zipcode data
                  onClick={getZipCodeData} 
                  variant="outline-secondary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={4} md={2}></Col>
        </Row>
        <Row>
          <Col xs={4} md={2}></Col>
          <Col xs={12} md={8}>
            <ListGroup as="ul">
              <ListGroup.Item
                as="li"
                active
                style={{ backgroundColor: '#4fc8dc', border: 'none' }}
              >
                Search Results...
              </ListGroup.Item>
                {/* Mapping through options  */}
              {projectDataByZip.records &&
                projectDataByZip.records.length > 0 &&
                projectDataByZip.records.map((item) => {
                  return (
                    <ListGroup.Item as="li">
                     {/* Linking results to the project details page  */}
                      <a href={'../ProjectDetails?id=' + item.id}>
                        {item.fields.projectTitle}
                      </a>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          </Col>
          <Col xs={4} md={2}></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={4} md={2}>
            <Button className="search-buttons">
              {/* Route to the connect page */}
              <Link to={ROUTES.CONNECT} className="search-links">
                Search Options
              </Link>
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withFirebase(
  withAuthorization(condition)(LocationPage),
);
