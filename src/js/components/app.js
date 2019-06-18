import React from 'react';
import ReactDOM from 'react-dom';
import Prefectures from './prefectures';
import Chart from './chart';
import {getPrefectures} from '../actions/app-actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getPrefectures();
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
