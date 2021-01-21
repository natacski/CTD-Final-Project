import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';

const ProjectDetails = () => {
  // Declare a new state variables
  const [projectDataById, setProjectDataById] = useState({});

  //getting data by zipcode
  const getProject = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    let projectId = urlParams.get('id');
    let url =  process.env.REACT_APP_PROJECT_FORM + projectId + '?api_key=' +  process.env.REACT_APP_AIRTABLE_API_KEY; //.env variable
    const response = await fetch(url);
    const projectData = await response.json();
    setProjectDataById(projectData.fields);
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div style={{ margin: 40, padding: 30 }}>
      <Container>
        <Row xs={1} md={2}>
          <Col>
            <div>
              <h4>
                  {/* displays updated items from the table*/}
                {projectDataById && projectDataById.projectTitle}
              </h4>
              <br></br>
                 {/* displays updated items from the table*/}
              {projectDataById && projectDataById.projectDescription}
            </div>
          </Col>
          <Col style={{ marginTop: 50 }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="Blue"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <div className="details-title">Idea From: </div>

                {/* displays updated items from the table*/}
                {projectDataById && projectDataById.firstName + ' ' +  projectDataById.lastName}
              </ListGroup.Item>

              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="blue"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                  />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
                <div className="details-title">
                  Number of Contributors:{' '}
                </div>
               {/* displays updated items from the table*/}
                {projectDataById && projectDataById.numOfContributors}
              </ListGroup.Item>
              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="blue"
                  class="bi bi-file-earmark-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
                <div className="details-title">Area: </div>
                 {/* displays updated items from the table*/}
                {projectDataById && projectDataById.area}
              </ListGroup.Item>
              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="blue"
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
                {projectDataById && projectDataById.level}
              </ListGroup.Item>

              <ListGroup.Item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="blue"
                  class="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <div className="details-title">Zip Code: </div>
                 {/* displays updated items from the table*/}
                {projectDataById && projectDataById.zipcode}
              </ListGroup.Item>

              <ListGroup.Item>
                Do you want to be part of this project? For more
                details please contact
                <div className="details-title">
                 {/* displays updated items from the table*/}
                  {projectDataById && projectDataById.email}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withFirebase(withAuthorization(condition)(ProjectDetails));
