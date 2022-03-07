import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
    this.hendleGetUser = this.hendleGetUser.bind(this);
  }

  componentDidMount() {
    this.hendleGetUser();
  }

  hendleGetUser = async () => {
    const userName = await getUser();
    this.setState({ loading: false, userName });
  };

  hendleLinks = () => {
    const { userName } = this.state;
    return (
      <div>
        <ul>
          <li>
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </li>
        </ul>
        { !userName ? <Loading />
          : <h2 data-testid="header-user-name">{ userName.name }</h2> }
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        <p> vou ficar louco </p>
        { loading ? <Loading /> : this.hendleLinks() }
      </header>
    );
  }
}

export default Header;
