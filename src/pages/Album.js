import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritesSongs: [],
      listMusic: [],
      artist: '',
      album: '',
    };
    this.favorites = this.favorites.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.favorites();
    const results = await getMusics(id);
    this.setState({
      listMusic: [...results],
      artist: results[0].artistName,
      album: results[0].collectionName,
    });
  }

  favorites() {
    this.setState({
      loading: true,
    }, async () => {
      const results = await getFavoriteSongs();
      this.setState({
        favoritesSongs: [...results],
        loading: false,
      });
    });
  }

  render() {
    const { listMusic,
      artist,
      album,
      loading,
      favoritesSongs,
    } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-album">
          <Header />
          <h2 data-testid="artist-name">{ artist }</h2>
          <h2 data-testid="album-name">{ album }</h2>
          { listMusic.map((item) => {
            const { trackId } = item;
            if (item.previewUrl === undefined) {
              return null;
            }
            return (
              <MusicCard
                checked={ favoritesSongs.some((song) => song.trackId === item.trackId) }
                song={ item }
                key={ trackId }
              />
            );
          })}
        </div>
      )
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
