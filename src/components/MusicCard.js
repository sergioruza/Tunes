import React, { Component } from 'react';
import PropType from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
// ====================> Referenciando alguns toque de Arthur Debiase para os requisitos 9 e 10

export default class MusicCard extends Component {
  state = {
    check: false,
    loading: false,
    // favorite: [],
  };

  componentDidMount() {
    this.favoriteStorage();
  }

  onChange = async () => {
    this.setState({ loading: true });
    const { elemento } = this.props;
    const { check } = this.state;
    if (check) {
      await removeSong(elemento);
      this.setState({
        loading: false,
        check: false,
      });
    } else {
      await addSong(elemento);
      this.setState({
        loading: false,
        check: true,
      });
    }
  };

  favoriteStorage = async () => {
    const favorite = await getFavoriteSongs();
    const { elemento: { trackId } } = this.props;
    this.setState({
      // favorite,
      check: favorite.some((elemento) => elemento.trackId === trackId),
    });
  };

  render() {
    const { trackName, previewUrl, elemento: { trackId } } = this.props;
    const { loading, check } = this.state;
    return (
      <div className="insideMusic">
        <div>
          <h4>{trackName}</h4>
          {
            loading && <Loading />
          }
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track
              kind="captions"
            />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <label htmlFor="addFav">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            className="addFav"
            type="checkbox"
            onChange={ this.onChange }
            checked={ check }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropType.string,
  previewUrl: PropType.string,
  elemento: PropType.object,
}.isRequired;
