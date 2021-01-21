import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo3.png';
// import AuthUserContext from '../Session/context';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';

const HomeSponsorsPage = () => {
  const [areaOptions, setAreaOptions] = useState({});
  const [levelOptions, setLevelsOptions] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [level, setLevel] = useState('');
  const [amount, setAmount] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //getting data for areas
  const getAreasData = async () => {
    const response = await fetch(
      'https://api.airtable.com/v0/appjvJEkIJyX9bcmM/areas?api_key=keyclOytaXo7NHQ8M',
    );
    const areasData = await response.json();
    return areasData;
  };
  useEffect(() => {
    getAreasData().then((data) => setAreaOptions(data.records));
  }, []);

  //getting data for levels
  const getLevelsData = async () => {
    const response = await fetch(
      'https://api.airtable.com/v0/appjvJEkIJyX9bcmM/levels?api_key=keyclOytaXo7NHQ8M',
    );
    const levelsData = await response.json();
    return levelsData;
  };
  useEffect(() => {
    getLevelsData().then((data) => setLevelsOptions(data.records));
  }, []);

  const handleProjectFormChange = (e) => {
    console.log(e.target.name + ' has changed => ' + e.target.value);
    if (e.target.name === 'company-name') {
      setCompanyName(e.target.value);
    } else if (e.target.name === 'website') {
      setWebsite(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'phone-number') {
      setPhone(e.target.value);
    } else if (e.target.name === 'area') {
      setArea(e.target.value);
    } else if (e.target.name === 'level') {
      setLevel(e.target.value);
    } else if (e.target.name === 'amount') {
      setAmount(e.target.value);
    }
  };

  //Posting data to new-project-form on Airtable
  const postNewSession = () => {
    fetch(
      'https://api.airtable.com/v0/appjvJEkIJyX9bcmM/company-form',
      {
        body: JSON.stringify({
          records: [
            {
              fields: {
                companyName: companyName,
                website: website,
                email: email,
                phone: phone,
                area: area,
                level: level,
                amount: amount,
              },
            },
          ],
        }),
        headers: {
          Authorization: 'Bearer keyclOytaXo7NHQ8M',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )
      .then(() => {
        console.log('saved changes');
        setCompanyName('');
        setWebsite('');
        setEmail('');
        setPhone('');
        setArea('');
        setLevel('');
        setAmount('');
        setShow(false);
      })
      .catch((e) => {
        alert('Error submitting form ' + e.message);
        console.log(e);
      });
  };

  return (
    <>
      <h3>Thank you for your interest in become a sponsor!</h3>
      <div style={{ margin: 30 }}>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Row>
                <h4>About Us</h4>

                <p style={{ color: 'black' }}>
                  "Next idea" is a platform for innovators to share
                  project ideas and find people interested in
                  contributing to that idea. At the same time, the
                  innovators will have the opportunity to find
                  companies interested in investing in their projects.
                  On the other hand, there will be a dashboard for
                  companies to see the new project ideas recently
                  added and have the opportunity to support some of
                  them. The technologies used are React, Firebase, and
                  Airtable.
                </p>
              </Row>
              <Row>
                <Col></Col>
                <Col>
                  <img
                    src={Logo}
                    width="150"
                    height="150"
                    alt="next idea logo"
                  />
                </Col>
                <Col></Col>
              </Row>
            </Col>

            <Col xs={12} md={6}>
              <Row>
                <Card
                  border="primary"
                  style={{
                    width: '25rem',
                    marginLeft: 60,
                    marginTop: 50,
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <div className="card-title">
                        Are you ready to make dreams come true?
                      </div>
                    </Card.Title>
                    <p style={{ color: 'black' }}>
                      {' '}
                      Please fill out the following form
                    </p>
                    <Button variant="primary" onClick={handleShow}>
                      File Now
                    </Button>
                    <Modal
                      size="lg"
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header
                        closeButton
                        style={{
                          background: '#090979',
                          color: 'white',
                        }}
                      >
                        <Modal.Title>Application</Modal.Title>
                      </Modal.Header>

                      {/* add a project form */}
                      <Modal.Body>
                        <Form onChange={handleProjectFormChange}>
                          <Form.Row>
                            <Col>
                              <Form.Label for="company-name">
                                Company's Name:
                              </Form.Label>
                              <Form.Control
                                name="company-name"
                                id="company-name"
                                type="text"
                                value={companyName}
                              />
                            </Col>
                            <Col>
                              <Form.Label for="website">
                                Website:
                              </Form.Label>
                              <Form.Control
                                name="website"
                                id="website"
                                type="text"
                                value={website}
                              />
                            </Col>
                          </Form.Row>
                          <Form.Row>
                            <Col>
                              <Form.Label for="email">
                                Email:
                              </Form.Label>
                              <Form.Control
                                name="email"
                                id="email"
                                type="email"
                                placeholder="email@email.com"
                                value={email}
                              />
                            </Col>
                            <Col>
                              <Form.Label for="phone">
                                Phone number:
                              </Form.Label>
                              <Form.Control
                                name="phone-number"
                                id="phone-number"
                                type="tel"
                                placeholder="123-456-7890"
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                value={phone}
                              ></Form.Control>
                            </Col>
                          </Form.Row>

                          <Form.Row>
                            <Col>
                              <Form.Label for="area">
                                Area:
                              </Form.Label>
                              <Form.Control
                                value={area}
                                name="area"
                                id="area"
                                as="select"
                                size="sm"
                                custom
                              >
                                <option value="">
                                  Select an area
                                </option>
                                {areaOptions.length > 0 &&
                                  areaOptions.map((option) => {
                                    return (
                                      <option
                                        key={option.id}
                                        value={option.fields.Name}
                                      >
                                        {option.fields.Name}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                            </Col>
                            <Col>
                              <Form.Label for="level">
                                Level:
                              </Form.Label>
                              <Form.Control
                                value={level}
                                name="level"
                                id="level"
                                as="select"
                                size="sm"
                                custom
                              >
                                <option value="">
                                  Select a level
                                </option>
                                {levelOptions.length > 0 &&
                                  levelOptions.map((option) => {
                                    return (
                                      <option
                                        key={option.id}
                                        value={option.fields.Name}
                                      >
                                        {option.fields.Name}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                            </Col>
                          </Form.Row>
                          <Form.Row>
                            <Col>
                              <Form.Label for="amount">
                                Sponsorship amount:
                              </Form.Label>

                              <Form.Control
                                name="amount"
                                id="amount"
                                value={amount}
                                type="text"
                                placeholder="$20,000"
                              />
                            </Col>
                            <Col></Col>
                          </Form.Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleClose}
                        >
                          Close
                        </Button>
                        <Button onClick={postNewSession}>
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Body>
                </Card>
              </Row>
              <Row>
                <Card
                  border="secondary"
                  style={{
                    width: '25rem',
                    marginLeft: 60,
                    marginTop: 20,
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <div className="card-title">
                        Do you want to search for projects?
                      </div>
                    </Card.Title>
                    <Button className="card-buttons">
                      <Link
                        to={ROUTES.CONNECT}
                        className="search-links"
                      >
                        Search Now
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withFirebase(
  withAuthorization(condition)(HomeSponsorsPage),
);
