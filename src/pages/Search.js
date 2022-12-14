import React, { Component } from 'react';
// import uuid from 'reac-uu';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    music: '',
    buttonDisable: true,
    loading: false,
    arrayOfTunes: [],
    success: false,
  };

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  inputChange = ({ target }) => {
    const { value } = target;
    this.setState({ music: value }, () => this.validaInput());
  };

  validaInput = () => {
    const { music } = this.state;
    const min = 2;
    if (music.length >= min) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  };

  onCLick = async () => { // ====================> refenciando ajuda mentoria de projeto para onde o problema era problema de assincronismo no "Carregando..." - támbem rerefenciando alguns toques de Arthur Debiase. Questão 6
    const { music } = this.state;
    this.setState({
      loading: true,
    });

    const data = await searchAlbumsAPI(music);

    this.setState({
      arrayOfTunes: data,
      loading: false,
      success: true,
    });
  };

  render() {
    const { buttonDisable, loading, arrayOfTunes, success, music } = this.state;
    const card = arrayOfTunes.map(({ artistName,
      collectionName,
      artworkUrl100,
      artistId,
      collectionId,
    }) => (
      <CardAlbum
        key={ artistId }
        artistName={ artistName }
        collectionName={ collectionName }
        collectionId={ collectionId }
        artworkUrl100={ artworkUrl100 }
      />
    ));

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search">
          {
            loading ? <Loading /> : (
              <>
                <label htmlFor="music">
                  <input
                    placeholder="Artists or songs"
                    onChange={ this.inputChange }
                    className="music"
                    data-testid="search-artist-input"
                  />
                </label>
                <button
                  className="btnSearch"
                  type="button"
                  disabled={ buttonDisable }
                  data-testid="search-artist-button"
                  onClick={ this.onCLick }
                >
                  Pesquisar

                </button>

              </>
            )
          }
          {
            success && <h3 className="result">{`Resultado de álbuns de: ${music}`}</h3>
          }

        </div>
        {
          arrayOfTunes.length === 0
            ? <p className="not">Nenhum álbum foi encontrado</p>
            : <div className="cardAlbum">{card}</div>
        }
      </div>
    );
  }
}
