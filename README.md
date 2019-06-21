# 都道府県別の人口推移

都道府県別の人口推移を表示する SPA

- 都道府県にチェックを入れると、選択された都道府県の「人口推移」をグラフで表示する
- 複数都道府県を選択可能
- X軸:年、Y軸:人口数の折れ線グラフを動的に生成して表示する

## インストール

1. `$ npm install`
2. `.env.sample` を `.env` にリネーム
3. `.env` を開いて `RESAS_API_KEY=xxx` 部分の `xxx` を [RESAS](https://opendata.resas-portal.go.jp/) の API KEY に書き換え

## 実行方法

### 実行 (webpack-dev-server)

```bash
$ npm run start
```

### 開発用 (webpack-dev-server + watch)

```bash
$ npm run start:dev
```

## Demo

https://polygonplanet.github.io/population-composition/demo/
