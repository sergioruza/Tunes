import React, { Component } from 'react';
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

  onCLick = async () => {
    const { music } = this.state;
    this.setState({
      loading: true,
      arrayOfTunes: await searchAlbumsAPI(music),
    });
    this.setState({
      loading: false,
      success: true,
    });
  };

  render() {
    const { buttonDisable, loading, arrayOfTunes, success, music } = this.state;
    console.log(arrayOfTunes);
    return (
      <div data-testid="page-search">
        Search
        <Header />
        {
          loading ? <Loading /> : (
            <>
              <label htmlFor="music">
                <input
                  onChange={ this.inputChange }
                  id="music"
                  data-testid="search-artist-input"
                />
              </label>
              <button
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
          success && <h3>{`Resultado de álbuns de: ${music}`}</h3>
        }
      </div>
    );
  }
}
