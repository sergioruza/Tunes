import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbum extends Component {
  render() {
    const { artistName, collectionName, artworkUrl100, collectionId } = this.props;
    console.log(typeof collectionId);

    return (

      <div>
        { artistName.length === 0 ? <h2>Nenhum álbum foi encontrado</h2> : (
          <>
            <img src={ artworkUrl100 } alt={ artistName } />
            <h3>{ collectionName }</h3>
            <p>{ artistName }</p>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              Details

            </Link>
          </>
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