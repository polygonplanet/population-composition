import React from 'react';
import ReactDOM from 'react-dom';
import {hashCode, int2rgb} from '../libs/util';
import ChartStore from '../stores/chart-store';
import PrefecturesStore from '../stores/prefectures-store';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      populations: ChartStore.getPopulations()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ChartStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ChartStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({ populations: ChartStore.getPopulations() });
  }

  /**
   * ChartStoreが保持しているpopulationsをrechartsで使える形式に変換する
   *
   * @example
   *   console.log(this._getChartData())
   *   // [
   *   //   {year: 1960, 群馬県: 1578476, 東京都: 9683802, 山口県: 1602207, 福岡県: 4006679, ...},
   *   //   {year: 1965, 群馬県: 1605584, 東京都: 10869244, 山口県: 1543573, 福岡県: 3964611, ...},
   *   //   {year: 1970, 群馬県: 1658909, 東京都: 11408071, 山口県: 1511448, 福岡県: 4027416, ...}
   *   // ]
   *
   * @return {Array} rechartsで使える形式に変換した都道府県ごとの人口データ
   */
  _getChartData() {
    const populations = this.state.populations;
    const prefCodes = Object.keys(populations);
    if (prefCodes.length === 0) {
      return [];
    }

    const prefNames = PrefecturesStore.getPrefNames();
    const yearsTemplate = populations[prefCodes[0]].map(item => item.year);

    return yearsTemplate.reduce((memo, year, i) => {
      const item = { year };
      prefCodes.forEach(prefCode => {
        const prefName = prefNames[prefCode];
        // population: [{ "year": 1980, "value": 12817 }, { "year": 1985, "value": 12707 }, ...]
        const population = populations[prefCode];
        // populationItem: { "year": 1980, "value": 12817 }
        const populationItem = population[i];
        item.year = populationItem.year;
        item[prefName] = populationItem.value;
      });
      memo.push(item);
      return memo;
    }, []);
  }

  _getLines() {
    const prefNames = PrefecturesStore.getPrefNames();
    return Object.keys(this.state.populations).map(prefCode => {
      const prefName = prefNames[prefCode];
      const color = `#${int2rgb(hashCode(prefName))}`;
      return (
        <Line
          type="monotone"
          dataKey={prefName}
          stroke={color}
          key={prefCode}
        />
      );
    });
  }

  render() {
    const chartData = this._getChartData();
    if (chartData.length === 0) {
      return null;
    }

    const lines = this._getLines();
    return (
      <ResponsiveContainer width="100%" aspect={5.0/3.0}>
        <LineChart
          data={chartData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
