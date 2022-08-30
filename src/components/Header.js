import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loading: true,
    userName: '',
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      loading: false,
      userName: name,
    });
  }

  // chamada = async () => await getUser();

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : <h2 data-testid="header-user-name">{ userName }</h2>
        }
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <br />
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
