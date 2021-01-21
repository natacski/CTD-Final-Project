import React, { useState, useEffect, useContext } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import AuthUserContext from '../Session/context';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';
import Logo from '../../images/image1.png';
import Logo1 from '../../images/image2.png';

const HomePage = (props) => {
  
  const user = useContext(AuthUserContext);
  const [areaOptions, setAreaOptions] = useState({});
  const [levelOptions, setLevelsOptions] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [level, setLevel] = useState('');
  const [maxNum, setMaxNum] = useState('');
  const [amount, setAmount] = useState('');
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
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

  //getting name of user
  const getUserName = () => {
    props.firebase.db
      .ref('users/' + user.uid)
      .once('value', (snap) => {
        let databaseData = snap.val();
        setUserName(databaseData.username);
      });
  };

  //setting name of user
  useEffect(() => {
    getUserName();
  }, []);

  //setting options for area
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

  //handling changes
  const handleProjectFormChange = (e) => {
    console.log(e.target.name + ' has changed => ' + e.target.value);
    if (e.target.name === 'first-name') {
      setFirstName(e.target.value);
    } else if (e.target.name === 'last-name') {
      setLastName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'phone-number') {
      setPhone(e.target.value);
    } else if (e.target.name === 'zipcode') {
      setZipCode(e.target.value);
    } else if (e.target.name === 'project-name') {
      setProjectTitle(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    } else if (e.target.name === 'area') {
      setArea(e.target.value);
    } else if (e.target.name === 'level') {
      setLevel(e.target.value);
    } else if (e.target.name === 'max-contributor') {
      setMaxNum(e.target.value);
    } else if (e.target.name === 'amount') {
      setAmount(e.target.value);
    }
  };

  //Posting data to new-project-form on Airtable
  const postNewSession = () => {
    fetch(
      'https://api.airtable.com/v0/appjvJEkIJyX9bcmM/new-project-form',
      {
        body: JSON.stringify({
          records: [
            {
              fields: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                projectTitle: projectTitle,
                projectDescription: description,
                area: area,
                level: level,
                numOfContributors: maxNum,
                projectCost: amount,
                zipcode: zipCode,
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
        setFirstName('');
        setLastName('');
        setEmail('');
        setZipCode('');
        setPhone('');
        setProjectTitle('');
        setDescription('');
        setArea('');
        setLevel('');
        setMaxNum('');
        setAmount('');
        setShow(false);
      })
      .catch((e) => {
        alert('Error submitting form ' + e.message);
        console.log(e);
      });
  };

  return (
    <div style={{ margin: 30 }}>
      <div className="welcome-message">Welcome, {userName}</div>
      <Container>
        <Row xs={1} md={2}>
          <Col>
            <Card style={{ width: '25rem', marginLeft: 50 }}>
              <Card.Img variant="top" src={Logo1} />
              <Card.Body>
                <Card.Title>Do you have any project idea?</Card.Title>
                <Button onClick={handleShow}>Add a Project</Button>
                <Modal
                  size="lg"
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header
                    closeButton
                    style={{ background: '#090979', color: 'white' }}
                  >
                    <Modal.Title>Application</Modal.Title>
                  </Modal.Header>

                  {/* add new project form */}
                  <Modal.Body>
                    <Form onChange={handleProjectFormChange}>
                      <Form.Row>
                        <Col>
                          <Form.Label for="first-name">
                            First Name:
                          </Form.Label>
                          <Form.Control
                            name="first-name"
                            id="first-name"
                            type="text"
                            value={firstName}
                          />
                        </Col>
                        <Col>
                          <Form.Label for="last-name">
                            Last Name:
                          </Form.Label>
                          <Form.Control
                            name="last-name"
                            id="last-name"
                            type="text"
                            value={lastName}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Col>
                          <Form.Label for="email">Email:</Form.Label>
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
                        <Col>
                          <Form.Label for="zipcode">
                            Zip Code:
                          </Form.Label>
                          <Form.Control
                            name="zipcode"
                            id="zipcode"
                            type="text"
                            placeholder="12345"
                            value={zipCode}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Col>
                          <Form.Label for="project-name">
                            Project Name:
                          </Form.Label>
                          <Form.Control
                            name="project-name"
                            id="project-name"
                            type="text"
                            placeholder="Project Name"
                            value={projectTitle}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Col>
                          <Form.Label for="description">
                            Brief description of the project:
                          </Form.Label>
                          <Form.Control
                            name="description"
                            id="description"
                            as="textarea"
                            value={description}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Col>
                          <Form.Label for="area">Area:</Form.Label>
                          <Form.Control
                            value={area}
                            name="area"
                            id="area"
                            as="select"
                            size="sm"
                            custom
                          >
                            {/* Getting the area options from airtable */}
                            <option value="">Select an area</option>
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
                          <Form.Label for="level">Level:</Form.Label>
                          <Form.Control
                            value={level}
                            name="level"
                            id="level"
                            as="select"
                            size="sm"
                            custom
                          >
                            {/* Getting the level options from airtable */}
                            <option value="">Select a level</option>
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
                          <Form.Label for="max num">
                            Maximun number of contributors:
                          </Form.Label>

                          <Form.Control
                            name="max-contributor"
                            id="max-contributor"
                            value={maxNum}
                            type="text"
                            placeholder="1-10"
                          />
                        </Col>
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
                      </Form.Row>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button onClick={postNewSession}>Submit</Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>

          {/* find a project */}
          <Col>
            <Card style={{ width: '25rem', marginLeft: 50 }}>
              <Card.Img variant="top" src={Logo} />
              <Card.Body>
                <Card.Title>
                  Looking for a project to join?
                </Card.Title>
                <Button>
                  <Link className="search-links"
                    to={ROUTES.CONNECT}
                   
                  >
                    Find a Project
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const condition = (authUser) => !!authUser;
export default withFirebase(withAuthorization(condition)(HomePage));
