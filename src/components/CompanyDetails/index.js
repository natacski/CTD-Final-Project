import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import {
  Container,
  Col,
  Row,
  ListGroup,
  Button,
} from 'react-bootstrap';

const CompanyDetails = () => {
  // Declare a new state variables
  const [companyDataById, setCompanyDataById] = useState({});

  //getting data by zipcode
  const getCompanyData = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    let companyId = urlParams.get('id');
    let url = process.env.REACT_APP_COMPANY_FORM + companyId + '?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY; //.env variable
    const response = await fetch(url); //fetching database
    const companyData = await response.json();
    setCompanyDataById(companyData.fields);
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  return (
    <div style={{ margin: 40, padding: 30 }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={12} md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                 {/* displays updated items from the table*/}
                  {companyDataById && companyDataById.companyName}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#735aed"
                  class="bi bi-globe2"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                </svg>
                <div className="details-title">Website:</div>

               {/* displays updated items from the table*/}
                {companyDataById && companyDataById.website}
              </ListGroup.Item>

              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#735aed"
                  class="bi bi-cash"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                </svg>
                <div className="details-title">
                  Sponsorship Amount:
                </div>

                {/* displays updated items from the table*/}
                {companyDataById && companyDataById.amount}
              </ListGroup.Item>
              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#735aed"
                  class="bi bi-file-earmark-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
                <div className="details-title">Area: </div>

                  {/* displays updated items from the table*/}
                {companyDataById && companyDataById.area}
              </ListGroup.Item>
              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#735aed"
                  class="bi bi-person-check-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                  />
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>

                <div className="details-title">Level: </div>
                {/* displays updated items from the table*/}
                {companyDataById && companyDataById.level}
              </ListGroup.Item>
              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#735aed"
                  class="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                </svg>
                <div className="details-title">Contact:</div>

                {/* displays updated items from the table*/}
                {companyDataById && companyDataById.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#735aed"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                <div className="details-title">Posted on:</div>

                   {/* displays updated items from the table*/}
                {companyDataById && companyDataById.updated}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={4} md={2}>
            <Button className="search-buttons">
               {/* displays updated items from the table*/}
              <Link to={ROUTES.SPONSORS} className="search-links">
                More Sponsors
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

export default withFirebase( withAuthorization(condition)(CompanyDetails));
