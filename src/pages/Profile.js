import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    loading: false,
    getInfo: [],
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.getProfile();
  }

  getProfile = async () => {
    const getInfo = await getUser();
    this.setState({
      getInfo,
      loading: false,
    });
  };

  render() {
    const { loading, getInfo } = this.state;
    const { image, email, name, description } = getInfo;
    return (
      <div data-testid="page-profile">
        <Header />

        {
          loading ? <Loading /> : (
              <>
              <Link className='linkProfile' to="/profile/edit">Editar perfil</Link>
                <section className='profile'>
                  <img data-testid="profile-image" src={image} alt={name} />
                  <h3>{name}</h3>
                  <p>{email}</p>
                  <p>{description}</p>
                </section>
            </>
          )
        }

      </div>
    );
  }
}
