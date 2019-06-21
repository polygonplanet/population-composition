import {RESAS_API_KEY} from '../configs/config';
import AppDispatcher from '../dispatcher/app-dispatcher';
import {ActionTypes} from '../constants/app-constants';

/**
 * 都道府県一覧をRESASから取得
 *
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 * @return {void}
 */
export async function fetchPrefectures() {
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
export async function fetchPopulationsByPref(prefCode) {
  let data = null;
  try {
    if (_populationsCache.has(prefCode)) {
      // キャッシュがある場合
      data = _populationsCache.get(prefCode);
    } else {
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
      data = await response.json();
    }

    if (!data || !data.result) {
      throw new Error('Failed to get population composition');
    }

    // 都道府県の人口データはそうそう変わらないと想定し、連続で都道府県チェックした場合
    // リクエスト数が多くなるのでメモリを食わない程度をキャッシュしておく
    addPopulationsCache(prefCode, data);

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

const _populationsCache = new Map();
const _POPULATIONS_CACHE_MAX = 10;

function addPopulationsCache(prefCode, data) {
  if (_populationsCache.size > _POPULATIONS_CACHE_MAX) {
    const first = _populationsCache.keys().next();
    _populationsCache.delete(first.value);
  }
  _populationsCache.set(prefCode, data);
}

/**
 * キャッシュした都道府県ごとの人口構成データをクリア
 */
export function clearPopulationsCache() {
  _populationsCache.clear();
}

/**
 * 都道府県チェックボックスを選択した
 *
 * @param {number} prefCode 都道府県コード
 */
export function selectPref(prefCode) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.BEFORE_RECEIVE_POPULATIONS
  });
  fetchPopulationsByPref(prefCode);
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
