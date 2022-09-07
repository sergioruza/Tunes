import React, { Component } from 'react';
import uuid from 'react-uuid';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Favorites extends Component {
  state = {
    loading: true,
    favorites: [],
  };

  componentDidMount() {
    this.getFavorites();
  }

  componentDidUpdate() {
    // this.getFavorites();
  }

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
      loading: false,
    });
  };

  attFavorites = (param) => {
    this.setState({ loading: param });
  };

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorite">
          {
            loading ? <Loading /> : (
              favorites.map((musica) => (
                <MusicCard
                  key={ uuid() }
                  previewUrl={ musica.previewUrl }
                  trackName={ musica.trackName }
                  elemento={ musica }
                  attFavorites={ this.attFavorites }
                />
              ))
            )
          }
        </div>
      </div>
    );
  }
}
