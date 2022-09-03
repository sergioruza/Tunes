import React, { Component } from 'react';
import PropType from 'prop-types';
import uuid from 'react-uuid';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// ====================> Refenciando alguns toques de Arthur Debiase para o resquisito 7
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
    const dataFilter = data.filter((_, index) => index !== 0);
    this.setState({
      info: data[0],
      dataAlbum: dataFilter,
    });
  };

  render() {
    const { dataAlbum, info } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{info.artistName}</h1>
        <h2 data-testid="album-name">{info.collectionName}</h2>
        {
          dataAlbum.map((elemento) => (
            <MusicCard
              elemento={ elemento }
              previewUrl={ elemento.previewUrl }
              trackName={ elemento.trackName }
              key={ uuid() }
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
