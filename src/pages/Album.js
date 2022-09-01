import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    dataAlbum: [],
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const { id } = this.props.match.params;
    const data = await getMusics(id);
    console.log(data);
    this.setState({ dataAlbum: data });
  };

  render() {
    return (
      <div data-testid="page-album">
        Album
        <Header />
      </div>
    );
  }
}
