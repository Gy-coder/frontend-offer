/**
 * 方法1 使用Set去重
 * @param {*} arr 
 * @returns 
 * function deduplication(arr) {
    return Array.from(new Set(arr));
 * }
 */

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

function deduplication(arr) {
  return arr.reduce((prev, cur) => {
    return prev.includes(cur) ? prev : [...prev, cur];
  }, []);
}

module.exports = deduplication;
