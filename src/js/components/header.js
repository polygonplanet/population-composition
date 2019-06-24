import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar fixed-top flex-md-nowrap p-0 shadow nav-header">
        <header className="nav-header__header d-flex">
          <h1 className="nav-header__header__title">都道府県別の人口推移</h1>
          <div className="nav-header__header__github-link ml-auto">
            <a href="https://github.com/polygonplanet/population-composition">Source on GitHub</a>
          </div>
        </header>
      </nav>
    );
  }
}
