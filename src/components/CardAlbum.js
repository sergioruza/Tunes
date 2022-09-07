import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbum extends Component {
  render() {
    const { artistName, collectionName, artworkUrl100, collectionId } = this.props;

    return (

      <div>
        { artistName.length === 0 ? <h2>Nenhum álbum foi encontrado</h2> : (
          <div className="card">
            <img className="img" src={ artworkUrl100 } alt={ artistName } />
            <h3>{ collectionName }</h3>
            <p>{ artistName }</p>
            <Link
              className="albumLink"
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              Músicas

            </Link>
          </div>
        ) }
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artistName: PropType.string.isRequired,
  collectionName: PropType.string.isRequired,
  artworkUrl100: PropType.string.isRequired,
  collectionId: PropType.number.isRequired,
};
