import React, { Component } from 'react';
import PropType from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    // check: false,
    loading: false,
  };

  onChange = async () => {
    this.setState({ loading: true });
    const { elemento } = this.props;
    await addSong(elemento);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, elemento: { trackId } } = this.props;
    const { loading } = this.state;
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
