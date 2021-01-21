import React, { useEffect, useContext, useState } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import AuthUserContext from '../Session/context';
import { Button, Col, Row, ListGroup } from 'react-bootstrap';

const ProfilePage = (props) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [innovator, setInnovator] = useState(false);

  const user = useContext(AuthUserContext);

  const getUserProfile = () => {
    props.firebase.db
      .ref('users/' + user.uid)
      .once('value', (snap) => {
        let databaseData = snap.val();

        setUserName(databaseData.username);
        setEmail(databaseData.email);
        setInnovator(databaseData.innovator);
      });
  };

  const saveChanges = () => {
    props.firebase.db
      .ref('users/' + user.uid)
      .set({
        username: userName,
        email: email,
        innovator: innovator,
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div style={{ margin: 50 }}>
      <Row>
        <Col></Col>
        <Col xs={6} md={2}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: 50 }}>
        <Col></Col>
        <Col xs={6} md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Name:
              <input
              className="edit-profile"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                style={{marginLeft: 20}}
              /></h3> 
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={saveChanges} className="mainButtonStyle">Update</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withFirebase(
  withAuthorization(condition)(ProfilePage),
);
