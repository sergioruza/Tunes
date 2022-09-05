import React, { Component } from 'react';
import PropType from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
// ====================> Referenciando alguns toque de Arthur Debiase para os requisitos 9 e 10

export default class MusicCard extends Component {
  state = {
    check: false,
    loading: false,
    favorite: [],
  };

  componentDidMount() {
    this.nameUndefined();
    // const { favorite } = this.state;
    // const { elemento: { trackId } } = this.props;
    // this.setState({
    //   check: favorite.some((elemento) => elemento.trackId === trackId),
    // });
  }

  componentDidUpdate() {
    const { favorite } = this.state;
    console.log(favorite);
  }

  onChange = async ({ target }) => {
    this.setState({ loading: true });
    const { elemento } = this.props;
    await addSong(elemento);
    console.log(target);
    this.setState({
      loading: false,
      check: true,
    });
  };

  nameUndefined = async () => {
    const favorite = await getFavoriteSongs();
    const { elemento: { trackId } } = this.props;
    this.setState({
      favorite,
      check: favorite.some((elemento) => elemento.trackId === trackId),
    });
  };

  render() {
    const { trackName, previewUrl, elemento: { trackId } } = this.props;
    const { loading, check } = this.state;
    return (
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
        <label htmlFor="addFav">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="addFav"
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
