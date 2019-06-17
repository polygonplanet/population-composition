import React from 'react';
import ReactDOM from 'react-dom';
import PrefecturesStore from '../stores/prefectures-store';
import Prefecture from './prefecture';

export default class Prefectures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefectures: PrefecturesStore.getPrefectures()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    PrefecturesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PrefecturesStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({ prefectures: PrefecturesStore.getPrefectures() });
  }

  render() {
    const prefectures = this.state.prefectures.map(item => {
      return (
        <Prefecture
          name={item.prefName}
          value={item.prefCode}
          key={item.prefCode}
        />
      );
    });

    return (
      <div>
        {prefectures}
      </div>
    );
  }
}
