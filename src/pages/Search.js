import React from 'react';
import Header from '../components/Header';

const numMin = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeArtista: '',
      isSearchButtonDisabled: true,
    };
    this.sumCharacters = this.sumCharacters.bind(this);
  }

  sumCharacters({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { nomeArtista } = this.state;
      let disable = true;
      if (nomeArtista.length >= numMin) disable = false;
      this.setState({
        isSearchButtonDisabled: disable,
      });
    });
  }

  render() {
    const { isSearchButtonDisabled, nomeArtista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="nomeArtista">
            Nome do artista
            <input
              type="text"
              name="nomeArtista"
              id="nomeArtista"
              onChange={ this.sumCharacters }
              value={ nomeArtista }
              data-testid="search-artist-input"
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
