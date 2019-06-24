import React from 'react';
import ReactDOM from 'react-dom';
import PrefecturesStore from '../stores/prefectures-store';
import Prefecture from './prefecture';
import {clearPopulationsCache} from '../actions/app-actions';

export default class Prefectures extends React.Component {
  constructor(props) {
    super(props);
    this.state = PrefecturesStore.getAll();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    PrefecturesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PrefecturesStore.removeChangeListener(this._onChange);
    clearPopulationsCache();
  }

  _onChange() {
    this.setState(PrefecturesStore.getAll());
  }

  render() {
    const prefectures = this.state.prefectures.map((item, i) => {
      return (
        <li className="nav-item" key={i}>
          <Prefecture
            name={item.prefName}
            value={item.prefCode}
            key={item.prefCode}
          />
        </li>
      );
    });

    return (
      <nav className="col-md-2 bg-light sidebar prefectures">
        <div className="sidebar-sticky">
          <ul className="prefectures__items nav flex-column">
            {prefectures}
          </ul>
        </div>
      </nav>
    );
  }
}
