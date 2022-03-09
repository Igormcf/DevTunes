import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
  }

  addFavoriteSong(param) {
    this.setState({
      loading: true,
    }, (async () => {
      await addSong(param);
      this.setState({
        loading: false,
      });
    }
    ));
  }

  render() {
    const { song: { previewUrl, trackName, trackId }, song, checked } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <h3>{ trackName }</h3>
        { loading ? <Loading /> : (
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        )}
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.addFavoriteSong(song) }
            defaultChecked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
