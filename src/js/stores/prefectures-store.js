import EventEmitter from '../libs/event-emitter';
import AppDispatcher from '../dispatcher/app-dispatcher';
import {ActionTypes, PayloadSources} from '../constants/app-constants';

const CHANGE_EVENT = 'change';

const stateData = {
  prefectures: [],
  prefNames: {}
};

function setPrefectures(prefectures) {
  stateData.prefectures = prefectures;
  stateData.prefNames = getPrefNames(prefectures);
}

/**
 * prefCodeとprefNameのキーペアを持つオブジェクトを生成
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
 * @param {Object} prefCode,prefNameのキーを持つ都道府県の配列
 * @return {Object} prefCode(キー)とprefName(値)のペアを持つオブジェクト
 */
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
    }
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

export default new PrefecturesStore();
