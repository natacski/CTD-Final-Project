import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Row,
  ListGroup,
  Form,
  Container,
} from 'react-bootstrap';

const SkillsPage = () => {
  // Declare a new state variables
  const [projectDataBySkills, setProjectDataBySkills] = useState({});
  const [skillsOptions, setSkillsOptions] = useState([]);

  useEffect(() => {
    //Update the area options with Airtable data
    getSkillsOptions().then((data) => setSkillsOptions(data));
  }, []);

  //getting data filter by level
  const getSkillsData = async (level) => {
    let url =
      process.env.REACT_APP_NEW_PROJECT_DATA +
      "&filterByFormula=({level}='" +
      level +
      "')";
    const response = await fetch(url);
    const skillsData = await response.json();
    setProjectDataBySkills(skillsData);
  };

  //Get input options data from the project form
  const getSkillsOptions = async () => {
    let url = process.env.REACT_APP_NEW_PROJECT_DATA; //.env variables
    const response = await fetch(url); //fetching database
    const skillsOptionsData = await response.json();
    let uniqueSkills = [
      ...new Set(
        skillsOptionsData.records.map(
          (record) => record.fields.level, //mapping through area data
        ),
      ),
    ];
    return uniqueSkills.sort();
  };

  return (
    <div style={{ margin: 30 }}>
      <div className="skills-title">Skills</div>

      <Container>
        <Row>
          <Col xs={4} md={2}></Col>
          <Col xs={12} md={8}>
            <Form>
              <Form.Group>
                <h5>Select Skills Level</h5>
                <Form.Control
                  as="select"
                  custom
                  // Getting area values
                  onChange={(e) => getSkillsData(e.target.value)}
                >
                  <option>Select a Level</option>
                  {/* Mapping through options  */}
                  {skillsOptions.length > 0 &&
                    skillsOptions.map((option, i) => {
                      return (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Form>
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
                style={{ backgroundColor: '#faa94a', border: 'none' }}
              >
                Search Results...
              </ListGroup.Item>
              {/* Mapping through the skills items */}
              {projectDataBySkills.records &&
                projectDataBySkills.records.length > 0 &&
                projectDataBySkills.records.map((item) => {
                  return (
                    <ListGroup.Item as="li">
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
              {/* Linking results to the project details page  */}
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

export default withFirebase(withAuthorization(condition)(SkillsPage));
