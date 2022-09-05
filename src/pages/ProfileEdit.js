import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    redirect: false,
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate() {

  }

  getInfo = async () => {
    const get = await getUser();
    this.setState({
      image: get.image,
      email: get.email,
      name: get.name,
      description: get.description,
      loading: false,
    });
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  verifyInput = () => {
    const caracter = 1;
    const { image, email, name, description } = this.state;
    const length = (image.length && email.length
      && name.length && description.length) >= caracter;
    const verifyEmail = email.includes('@') && email.includes('.com');
    return !(length && verifyEmail);
  };

  render() {
    const { image, email, name, description, loading, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        ProfileEdit
        <Header />
        {
          loading ? <Loading /> : (
            <section>
              <label htmlFor="img">
                Foto de Perfil
                <input
                  onChange={ this.onChange }
                  name="image"
                  id="img"
                  data-testid="edit-input-image"
                  value={ image }
                />
              </label>

              <label htmlFor="name">
                Nome
                <input
                  onChange={ this.onChange }
                  name="name"
                  id="name"
                  data-testid="edit-input-name"
                  value={ name }
                />
              </label>

              <label htmlFor="email">
                E-mail
                <input
                  onChange={ this.onChange }
                  name="email"
                  id="email"
                  data-testid="edit-input-email"
                  value={ email }
                />
              </label>

              <label htmlFor="description">
                Descrição
                <input
                  onChange={ this.onChange }
                  name="description"
                  id="description"
                  data-testid="edit-input-description"
                  value={ description }
                />
              </label>

              <button
                disabled={ this.verifyInput() }
                type="button"
                data-testid="edit-button-save"
                onClick={ async () => {
                  this.setState({ loading: true });
                  await updateUser({ name, email, image, description });
                  this.setState({ loading: false, redirect: true });
                } }
              >
                Salvar

              </button>
            </section>
          )
        }
        {
          redirect && <Redirect to="/profile" />
        }
      </div>
    );
  }
}
