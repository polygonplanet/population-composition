import EventEmitter from '../libs/event-emitter';
import AppDispatcher from '../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from '../constants/app-constants';

const CHANGE_EVENT = 'change';

let _prefectures = [];
let _selectedPrefs = [];

function addSelectedPref(prefCode) {
  _selectedPrefs.push(prefCode);
}

function removeSelectedPref(prefCode) {
  const index = _selectedPrefs.indexOf(prefCode);
  if (index !== -1) {
    _selectedPrefs.splice(index, 1);
  }
}

class PrefecturesStore extends EventEmitter {
  constructor() {
    super();
    AppDispatcher.register(this._update.bind(this));
  }

  _update(payload) {
    let action;

    // AppDispatcher.handleViewActionからの通知
    if (payload.source === PayloadSources.VIEW_ACTION) {
      action = payload.action;
    } else {
      action = payload;
    }

    const {data, type} = action;
    switch (type) {
      case ActionTypes.RECEIVE_PREFECTURES:
        _prefectures = data.result;
        this.emit(CHANGE_EVENT);
        break;
      case ActionTypes.ADD_SELECTED_PREFS:
        addSelectedPref(data);
        break;
      case ActionTypes.REMOVE_SELECTED_PREFS:
        removeSelectedPref(data);
        break;
    }
  }

  getPrefectures() {
    return _prefectures;
  }

  getSelectedPrefs() {
    return _selectedPrefs;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default new PrefecturesStore();
