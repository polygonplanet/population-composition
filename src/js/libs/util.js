/**
 * 文字列を16進数のカラーコードに変換する
 * ref: https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
 *
 * @example
 *   console.log(stringToColor('abc'))   // "#223801"
 *   console.log(stringToColor('日本語')) // "#93898b"
 *   console.log(stringToColor('hello')) // "#9218a9"
 *
 * @param  {string} str 対象の文字列
 * @return {string} カラーコード
 */
export function stringToColor(str) {
  let hash = 0;
  let len = str.length;
  let i;
  for (i = 0; i < len; i++) {
    hash = (str.charCodeAt(i) + ((hash << 5) - hash)) | 0;
  }

  let color = '#';
  let value;
  for (i = 0; i < 3; i++) {
    value = (hash >> (i * 8)) & 0xdd; // 明るくなりすぎないようマスクする
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}
