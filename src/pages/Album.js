import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    dataAlbum: [],
    info: {},
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getMusics(id);
    this.setState({
      dataAlbum: data,
      info: data[0],
    });
  };

  render() {
    const { dataAlbum, info } = this.state;
    console.log(info);

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{info.artistName}</h1>
        <h2 data-testid="album-name">{info.collectionName}</h2>
        {
          dataAlbum.map(({ previewUrl,
            trackName,
          }, index) => (
            <MusicCard
              previewUrl={ previewUrl }
              trackName={ trackName }
              key={ index }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string.isRequired,
    }),
  }).isRequired,
};
