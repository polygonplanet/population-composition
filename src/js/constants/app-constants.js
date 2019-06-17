import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
  // 都道府県を取得した
  RECEIVE_PREFECTURES: null,
  // 人口構成を取得した
  RECEIVE_POPULATIONS: null,
  // 都道府県チェックボックスが選択された
  ADD_SELECTED_PREFS: null,
  // 都道府県チェックボックスが選択解除された
  REMOVE_SELECTED_PREFS: null
});

export const PayloadSources = keyMirror({
  // ActionからDispatcherに通知するとき
  VIEW_ACTION: null
});
