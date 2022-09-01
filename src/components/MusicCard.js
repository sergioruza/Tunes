import React, { Component } from 'react';
import PropType from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div>
        <h4>{trackName}</h4>
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
    );
  }
}

MusicCard.propTypes = {
  trackName: PropType.string.isRequired,
  previewUrl: PropType.string.isRequired,
};
