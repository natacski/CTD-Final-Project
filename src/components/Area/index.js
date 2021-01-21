import React, { useState, useEffect } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import {
  Button,
  Col,
  Row,
  ListGroup,
  Form,
  Container,
} from 'react-bootstrap';


const AreaPage = () => {
  const [projectDataByArea, setProjectDataByArea] = useState({});
  const [areaOptions, setAreaOptions] = useState([]);

  useEffect(() => {
    getAreaOptions().then((data) => setAreaOptions(data));
  }, []);

  //getting data by zipcode
  const getAreaData = async (area) => {
    // let url = process.env.REACT_APP_AREA_DATA_FILTER + area;
    let url =
      "https://api.airtable.com/v0/appjvJEkIJyX9bcmM/new-project-form?api_key=keyclOytaXo7NHQ8M&filterByFormula=({area}='" +
      area +
      "')";
    const response = await fetch(url);
    const areaData = await response.json();
    setProjectDataByArea(areaData);
  };

  const getAreaOptions = async () => {
    // let url = process.env.REACT_APP_AREA_DATA;
    let url = process.env.REACT_APP_NEW_PROJECT_DATA;
      // 'https://api.airtable.com/v0/appjvJEkIJyX9bcmM/new-project-form?api_key=keyclOytaXo7NHQ8M';
    const response = await fetch(url);
    const areaOptionsData = await response.json();
    let uniqueAreas = [
      ...new Set(
        areaOptionsData.records.map((record) => record.fields.area),
      ),
    ];
    return uniqueAreas.sort();
  };

  return (
    <div style={{ margin: 30 }}>
      <div className="area-title">Area of Study</div>
      <Container>
        <Row>
          <Col xs={4} md={2}></Col>
          <Col xs={12} md={8}>
            <Form>
              <Form.Group>
                <h5>Please select an area</h5>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => getAreaData(e.target.value)}
                >
                  <option>Select an area</option>
                  {areaOptions.length > 0 &&
                    areaOptions.map((option, i) => {
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
                style={{ backgroundColor: '#cb6ce6', border: 'none' }}
              >
                Search Results...
              </ListGroup.Item>
              {projectDataByArea.records &&
                projectDataByArea.records.length > 0 &&
                projectDataByArea.records.map((item) => {
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

export default withFirebase(withAuthorization(condition)(AreaPage));
