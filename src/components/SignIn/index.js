import React, { Component, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
//import AuthUserContext from '../Session/context';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });

        this.props.firebase.db
          .ref('users/' + user.user.uid)
          .once('value', (snap) => {
            let databaseData = snap.val();

            let isInnovator = databaseData.innovator;

            if (isInnovator) {
              this.props.history.push(ROUTES.HOME);
            } else {
              this.props.history.push(ROUTES.HOMECOMPANY);
            }
          });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} className="formStyle">
        <h2>Sign In</h2>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button
          className="mainButtonStyle"
          disabled={isInvalid}
          type="submit"
        >
          <strong>Sign In</strong>
        </button>

        {error && <p style={{ color: 'black' }}>{error.message}</p>}
        <div style={{ paddingTop: 20 }}>
          <PasswordForgetLink />
          <SignUpLink />
        </div>
      </form>
    );
  }
}

const SignInLink = () => (
  <p style={{ textAlign: 'left', color: '#090979' }}>
    Do you already have an account?{' '}
    <Link to={ROUTES.LANDING} className="linkStyle">
      Sign In
    </Link>
  </p>
);

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInLink };
