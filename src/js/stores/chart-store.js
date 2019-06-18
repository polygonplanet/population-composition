import EventEmitter from '../libs/event-emitter';
import AppDispatcher from '../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from '../constants/app-constants';

const CHANGE_EVENT = 'change';

let _populations = {};

function addPopulations(prefCode, population) {
  _populations[prefCode] = population;
}

function removePopulations(prefCode) {
  delete _populations[prefCode];
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
        this.emit(CHANGE_EVENT);
        break;
      case ActionTypes.REMOVE_POPULATIONS:
        removePopulations(action.prefCode);
        this.emit(CHANGE_EVENT);
        break;
    }
  }

  getPopulations() {
    return _populations;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default new ChartStore();
