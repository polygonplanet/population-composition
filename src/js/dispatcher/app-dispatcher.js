import {Dispatcher} from 'flux';
import {PayloadSources} from '../constants/app-constants';

const AppDispatcher = Object.assign(new Dispatcher(), {
  handleViewAction(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action
    });
  }
});

export default AppDispatcher;
