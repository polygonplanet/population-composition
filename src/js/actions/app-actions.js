import {RESAS_API_KEY} from '../configs/config';
import AppDispatcher from '../dispatcher/app-dispatcher';
import {ActionTypes} from '../constants/app-constants';

/**
 * 都道府県一覧をRESASから取得
 *
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 * @return {void}
 */
export async function getPrefectures() {
  try {
    const response = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      method: 'GET',
      headers: {
        'X-API-KEY': RESAS_API_KEY
      }
    });
    const data = await response.json();
    if (!data || !data.result) {
      throw new Error('Failed to get prefectures');
    }

    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_PREFECTURES,
      data
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * 1980-2045年(5年毎)の人口構成データをRESASから取得
 *
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 * @return {void}
 */
export async function getPopulationComposition() {
  try {
    // https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
    const url = new URL('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear');
    const params = {
      prefCode: 2,
      cityCode: '-'
    };
    url.search = new URLSearchParams(params);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': RESAS_API_KEY
      }
    });
    const data = await response.json();
    if (!data || !data.result) {
      throw new Error('Failed to get population composition');
    }
    console.log("data", data);

    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_POPULATIONS,
      data
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * 都道府県チェックボックスを選択した
 *
 * @param {number} prefCode 都道府県コード
 */
export function addSelectedPref(prefCode) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.ADD_SELECTED_PREFS,
    prefCode
  });
}

/**
 * 都道府県チェックボックスを選択解除した
 *
 * @param {number} prefCode 都道府県コード
 */
export function removeSelectedPref(prefCode) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.REMOVE_SELECTED_PREFS,
    prefCode
  });
}
