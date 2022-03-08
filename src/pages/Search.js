import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import AlbumList from '../components/AlbumList';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const numMin = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeArtista: '',
      isSearchButtonDisabled: true,
      listAlbuns: [],
      loading: false,
      artista: '',
    };
    this.sumCharacters = this.sumCharacters.bind(this);
    this.albunsResult = this.albunsResult.bind(this);
  }

  clickSearch = async () => {
    const { nomeArtista } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(nomeArtista);
    this.setState({
      artista: nomeArtista,
      nomeArtista: '',
      listAlbuns: result,
      loading: false,
    });
  }

  albunsResult(listAlbuns, artista) {
    if (listAlbuns.length === 0) {
      return <h3>Nenhum álbum foi encontrado</h3>;
    }
    return (
      <div>
        <h3>{`Resultado de álbuns de: ${artista}`}</h3>
        <div>
          {listAlbuns.map((item) => (
            <AlbumList
              data={ item }
              key={ item.collectionId }
            />
          ))}
        </div>
      </div>
    );
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
    const {
      isSearchButtonDisabled,
      nomeArtista,
      listAlbuns,
      loading,
      artista } = this.state;
    if (loading) return <Loading />;
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
              onClick={ this.clickSearch }
            >
              Pesquisar
            </button>
          </label>
        </form>
        <section>
          { loading ? <Loading />
            : artista && this.albunsResult(listAlbuns, artista)}
        </section>
      </div>
    );
  }
}

export default Search;
