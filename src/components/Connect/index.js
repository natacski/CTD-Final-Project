import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const ConnectPage = () => {
  return (
    <div style={{ margin: 30 }}>
      <h1 style={{ paddingLeft: 40 }}>Connect</h1>
      <CardDeck style={{ margin: 30 }}>
        <Card style={{ background: '#cb6ce6' }}>
          <Card.Body className="space">
            {/* Route to the area page */}
            <Link to={ROUTES.AREA} className="box-title">
              Area of Study
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ background: '#4fc8dc' }}>
          <Card.Body className="space">
            {/* Route to the location page */}
            <Link to={ROUTES.LOCATION} className="box-title">
              By Location
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ background: '#faa94a' }}>
          <Card.Body className="space">
            {/* Route to the skills page */}
            <Link to={ROUTES.SKILLS} className="box-title">
              Skills Level
            </Link>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withFirebase(
  withAuthorization(condition)(ConnectPage),
);
