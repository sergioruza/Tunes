import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    user: '',
    buttonDisabled: true,
    loading: false,
    redirect: false,
  };

  componentDidMount() {

  }

  onChange = ({ target }) => {
    const { value } = target;
    this.setState({ user: value }, () => this.buttonDisabled());
  };

  buttonDisabled = () => {
    const { user } = this.state;
    const min = 3;
    if (user.length >= min) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  render() {
    const { user, buttonDisabled, loading, redirect } = this.state;
    return (
      <div className="login" data-testid="page-login">

        {
          loading ? <Loading /> : (
            <div>
              <label htmlFor="nameUser">
                <input
                  onChange={ this.onChange }
                  className="nameUser"
                  data-testid="login-name-input"
                />
              </label>
              <button
                disabled={ buttonDisabled }
                className="btnLogin"
                type="button"
                data-testid="login-submit-button"
                onClick={ async () => {
                  this.setState({
                    loading: true,
                  });
                  await createUser({ name: user });
                  this.setState({
                    redirect: true,
                  });
                } }
              >
                Entrar

              </button>
            </div>
          )
        }
        {
          redirect && <Redirect to="/search" />
        }
      </div>
    );
  }
}
