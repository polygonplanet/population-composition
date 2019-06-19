import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
  // 都道府県を取得した
  RECEIVE_PREFECTURES: null,
  // 人口構成を取得した
  RECEIVE_POPULATIONS: null,
  // 人口構成を取得する前
  BEFORE_RECEIVE_POPULATIONS: null,
  // 都道府県ごとの人口構成を追加
  ADD_POPULATIONS: null,
  // 都道府県ごとの人口構成を削除
  REMOVE_POPULATIONS: null
});

export const PayloadSources = keyMirror({
  // ActionからDispatcherに通知するとき
  VIEW_ACTION: null
});
