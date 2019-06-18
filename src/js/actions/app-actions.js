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
 * @param {number} prefCode 都道府県コード
 * @return {void}
 */
export async function getPopulationsByPref(prefCode) {
  try {
    const url = new URL('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear');
    const params = {
      prefCode: prefCode,
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

    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_POPULATIONS,
      data: {
        prefCode,
        populations: data
      }
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
export function selectPref(prefCode) {
  getPopulationsByPref(prefCode);
}

/**
 * 都道府県チェックボックスを選択解除した
 *
 * @param {number} prefCode 都道府県コード
 */
export function unselectPref(prefCode) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.REMOVE_POPULATIONS,
    prefCode
  });
}
