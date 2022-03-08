import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      listMusics: [],
      artist: '',
      album: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const results = await getMusics(id);
    this.setState({
      listMusics: [...results],
      artist: results[0].artistName,
      album: results[0].collectionName,
    });
  }

  render() {
    const { listMusics, artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artist }</h2>
        <h2 data-testid="album-name">{ album }</h2>
        { listMusics.map((item) => {
          const { trackName, previewUrl } = item;
          if (item.previewUrl === undefined) {
            return null;
          }
          return (
            <MusicCard
              trackName={ trackName } // define as informações que são passadas ao componenter MusicCard
              previewUrl={ previewUrl }
              key={ trackName }
            />
          );
        })}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
