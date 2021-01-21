import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../images/logo1.png';
import { SignInLink } from '../SignIn';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  innovator: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne, innovator } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          innovator,
        });
      })

      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });

        if (innovator) {
          this.props.history.push(ROUTES.HOME);
        } else {
          this.props.history.push(ROUTES.HOMECOMPANY);
        }
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeUserType = (event) => {
    console.log(event.target.value);
    this.setState({ innovator: event.target.value === 'innovator' });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      innovator,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="landingPage">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <form onSubmit={this.onSubmit} className="formStyle">
                <h2>Sign Up</h2>
                <input
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Full Name"
                />
                <input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
                <input
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
                <input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />

                <div onChange={this.onChangeUserType}>
                  <input
                    name="userType"
                    value="innovator"
                    type="radio"
                  />{' '}
                  <label for="innovator" style={{ marginRight: 40 }}>
                    Innovator
                  </label>
                  <input
                    name="userType"
                    value="company"
                    type="radio"
                  />{' '}
                  <label for="company">Company</label>
                </div>

                <br></br>
                <button
                  className="mainButtonStyle"
                  disabled={isInvalid}
                  type="submit"
                >
                  Sign Up
                </button>

                {error && (
                  <p style={{ color: 'black' }}>{error.message}</p>
                )}
                <div style={{ paddingTop: 20 }}>
                  <SignInLink />
                </div>
              </form>
            </Col>
            <Col xs={12} md={6}>
              <img
                className="d-block w-2"
                src={Logo}
                alt="next idea logo"
                style={{ marginTop: 100 }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p style={{ textAlign: 'left', color: '#090979' }}>
    Don't have an account?{' '}
    <Link to={ROUTES.SIGN_UP} className="linkStyle">
      Sign Up
    </Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
