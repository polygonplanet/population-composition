import React from 'react';
import ReactDOM from 'react-dom';
import {
  selectPref,
  unselectPref
} from '../actions/app-actions';

export default class Prefecture extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    const checked = event.target.checked;
    if (checked) {
      selectPref(this.props.value);
    } else {
      unselectPref(this.props.value);
    }
  }

  render() {
    const id = `pref-${this.props.value}`;
    return (
      <div className="custom-control custom-checkbox prefecture">
        <input
          type="checkbox"
          className="custom-control-input"
          id={id}
          value={this.props.value}
          onChange={this.handleChange.bind(this)}
        />
        <label className="custom-control-label" htmlFor={id}>
          {this.props.name}
        </label>
      </div>
    );
  }
}
