import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Prefectures from './prefectures';
import Chart from './chart';
import {fetchPrefectures} from '../actions/app-actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetchPrefectures();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Prefectures />
            <main role="main" className="content col-md-9 ml-sm-auto col-lg-10 px-4">
              <Chart />
            </main>
          </div>
        </div>
      </div>
    );
  }
}
