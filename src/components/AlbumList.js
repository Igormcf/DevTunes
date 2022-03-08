import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumList extends React.Component {
  render() {
    const { data: { collectionName, artistName, artworkUrl100,
      collectionId } } = this.props;
    return (
      <div>
        <h3>{artistName}</h3>
        <section>
          <img src={ artworkUrl100 } alt={ collectionName } />
        </section>
        <section>
          <Link
            to={ `album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            { collectionName }
          </Link>
        </section>
      </div>
    );
  }
}

AlbumList.propTypes = {
  data: PropTypes.shape({
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};

export default AlbumList;
