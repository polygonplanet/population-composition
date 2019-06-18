/**
 * 文字列を32bit整数でハッシュ化する
 * ref: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 *
 * @example
 *   console.log(hashCode('abc'))   // 96354
 *   console.log(hashCode('日本語')) // 25921943
 *   console.log(hashCode('hello')) // 99162322
 *
 * @param  {string} str 対象の文字列
 * @return {number} ハッシュ化した整数
 */
export function hashCode(str) {
  let hash = 0;
  let len = str.length;
  if (len === 0) {
    return hash;
  }

  let ch;
  for (let i = 0; i < len; i++) {
    ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * 整数をを16進数のcss用カラーコードに変換する
 *
 * @example
 *   console.log(int2rgb(0)) // "000000"
 *   console.log(int2rgb(-100)) // "ffff9c"
 *   console.log(int2rgb(327917)) // "0500ed"
 *   console.log(int2rgb(0x32342)) // "032342"
 *   console.log(int2rgb(0x123456789)) // "456789"
 *
 * @param  {number} i 対象の整数
 * @return {string} カラーコード
 */
export function int2rgb(i) {
  const c = (i & 0x00ffffff).toString(16);
  return '00000'.substring(0, 6 - c.length) + c;
}
