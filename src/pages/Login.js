import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const numMin = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      textName: '',
      isEnterButtonDisabled: true,
      loading: false,
      redirection: false,
    };
    this.sumCharacters = this.sumCharacters.bind(this);
  }

  clickEnter = async () => {
    const { textName } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name: textName });
    this.setState({
      loading: false,
      redirection: true,
    });
  }

  sumCharacters({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { textName } = this.state;
      let disable = true;
      if (textName.length >= numMin) disable = false;
      this.setState({
        isEnterButtonDisabled: disable,
      });
    });
  }

  render() {
    const { isEnterButtonDisabled, loading, redirection } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="textName">
            Nome
            <input
              type="text"
              name="textName"
              id="textName"
              data-testid="login-name-input"
              onChange={ this.sumCharacters }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isEnterButtonDisabled }
            onClick={ this.clickEnter }
          >
            Entrar
          </button>
        </form>
        { redirection ? <Redirect to="search" /> : '' }
      </div>
    );
  }
}

export default Login;
