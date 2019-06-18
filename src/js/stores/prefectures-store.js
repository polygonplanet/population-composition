import EventEmitter from '../libs/event-emitter';
import AppDispatcher from '../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from '../constants/app-constants';

const CHANGE_EVENT = 'change';

let _prefectures = [];
let _prefNames = [];
let _selectedPrefs = {};

function addSelectedPref(prefCode, prefName) {
  _selectedPrefs[prefCode] = prefName;
}

function removeSelectedPref(prefCode) {
  delete _selectedPrefs[prefCode];
}

function setPrefectures(prefectures) {
  _prefectures = prefectures;
  _prefNames = getPrefNames(prefectures);
}

function getPrefNames(prefectures) {
  return prefectures.reduce((memo, pref) => {
    memo[pref.prefCode] = pref.prefName;
    return memo;
  }, {});
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

    switch (action.type) {
      case ActionTypes.RECEIVE_PREFECTURES:
        setPrefectures(action.data.result);
        this.emit(CHANGE_EVENT);
        break;
      case ActionTypes.ADD_SELECTED_PREFS:
        addSelectedPref(action.prefCode, action.prefName);
        break;
      case ActionTypes.REMOVE_SELECTED_PREFS:
        removeSelectedPref(action.prefCode);
        break;
    }
  }

  getPrefectures() {
    return _prefectures;
  }

  getSelectedPrefs() {
    return _selectedPrefs;
  }

  /**
   * prefCodeとprefNameのキーペアを持つオブジェクトを返す
   *
   * @example
   *   console.log(getPrefNames());
   *   //  {
   *   //    "1": "北海道",
   *   //    "2": "青森県",
   *   //    "3": "岩手県",
   *   //    "4": "宮城県",
   *   //    "5": "秋田県",
   *   //    "6": "山形県",
   *   //    "7": "福島県",
   *   //    "8": "茨城県",
   *   //    "9": "栃木県",
   *   //    ...
   *   //  }
   *
   * @return {Object} prefCode(キー)とprefName(値)のペアを持つオブジェクト
   */
  getPrefNames() {
    return _prefNames;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default new PrefecturesStore();
