import React from 'react';
import ReactDOM from 'react-dom';
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
        <Prefectures />
        <Chart />
      </div>
    );
  }
}
