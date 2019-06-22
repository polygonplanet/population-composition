import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="text-center">
        <h1>都道府県別の人口推移</h1>
        <p>
          <a href="https://opendata.resas-portal.go.jp/">RESAS(地域経済分析システム)のAPI</a> を使用
        </p>
        {/* GitHub Ribbon */}
        <a href="https://github.com/polygonplanet/population-composition">
          <img
            style={{ position: "absolute", top: 0, left: 0, border: 0 }}
            src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"
            alt="Fork me on GitHub" />
        </a>
      </header>
    );
  }
}
