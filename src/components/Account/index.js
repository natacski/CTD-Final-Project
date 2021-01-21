import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { Row, Col } from 'react-bootstrap';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <Row>
          <Col></Col>
          <Col sm={8}>
            <h2 style={{ marginBottom: -45 }}>
              Account: {authUser.email}
            </h2>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </Col>
          <Col></Col>
        </Row>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
