/**
 * 方法1 使用Set去重
 * @param {*} arr 
 * @returns 
 * function deduplication(arr) {
    return Array.from(new Set(arr));
 * }
 */

const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

/**
 * 方法2 使用Map去重
 * @param {*} arr 
 * @returns
 * function deduplication(arr) {
        let result = new Array();
        const map = new Map();
        for (let i = 0; i < arr.length; i++) {
            if (!map.has(arr[i])) {
            map.set(arr[i], true);
            result.push(arr[i]);
            }
        }
        return result;
    } 
 */

/**
 * 
 * @param {*} arr 
 * @returns 
 * function deduplication(arr) {
      return arr.reduce((prev, cur) => {
        return prev.includes(cur) ? prev : [...prev, cur];
      }, []);
    }
 */

function deduplication(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}

module.exports = deduplication;
