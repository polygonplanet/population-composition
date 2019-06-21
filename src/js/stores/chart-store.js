import EventEmitter from '../libs/event-emitter';
import AppDispatcher from '../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from '../constants/app-constants';

const CHANGE_EVENT = 'change';

const stateData = {
  populations: {},
  isLoading: false
};

function addPopulations(prefCode, population) {
  stateData.populations[prefCode] = population;
}

function removePopulations(prefCode) {
  delete stateData.populations[prefCode];
}

class ChartStore extends EventEmitter {
  constructor() {
    super();
    AppDispatcher.register(this._update.bind(this));
  }

  _update(payload) {
    let action;
    if (payload.source === PayloadSources.VIEW_ACTION) {
      action = payload.action;
    } else {
      action = payload;
    }

    switch (action.type) {
      case ActionTypes.RECEIVE_POPULATIONS:
        // data[0]: 総人口
        // data[1]: 年少人口
        // data[2]: 生産年齢人口
        // data[3]: 老年人口
        addPopulations(action.data.prefCode, action.data.populations.result.data[0].data);
        stateData.isLoading = false;
        this._clearLoading();
        this.emit(CHANGE_EVENT);
        break;
      case ActionTypes.REMOVE_POPULATIONS:
        removePopulations(action.prefCode);
        this.emit(CHANGE_EVENT);
        break;
      case ActionTypes.BEFORE_RECEIVE_POPULATIONS:
        this._startLoading();
        break;
    }
  }

  _startLoading() {
    this._clearLoading();
    // すぐにLoadingを出すとチラつくので2秒以上APIレスポンスがなかったら出す
    this._loadingTimerId = setTimeout(() => {
      stateData.isLoading = true;
      this.emit(CHANGE_EVENT);
    }, 2000);
  }

  _clearLoading() {
    clearTimeout(this._loadingTimerId);
  }

  getAll() {
    return stateData;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default new ChartStore();
