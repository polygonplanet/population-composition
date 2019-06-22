import React from 'react';
import ReactDOM from 'react-dom';

export default class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const active = this.props.active ? 'loading-spinner--active' : '';
    return (
      <div className={`loading-spinner ${active}`}>
        <div className="spinner-grow text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
