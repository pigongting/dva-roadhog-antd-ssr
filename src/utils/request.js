import fetch from 'dva/fetch';

/**
 * 验证请求状态
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function checkStatus(response, action, timestamp) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  // return 返回结果
  console.log(timestamp);
  console.log(window[`${action.type}_fetchTimestamp`]);
  window[`${action.type}_fetchTimestamp`] = undefined;
  throw new Error(JSON.stringify({
    status: 'fetcherror',
    message: response.statusText,
    erroraction: action,
  }));
  // Not Found
}

/**
 * 验证请求结果
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function checkData(data, action, timestamp) {
  return data;
  // 正常情况
  if (data.api_code >= 200 && data.api_code < 300) {
    return data;
  }

  // 抛出异常
  console.log(timestamp);
  console.log(window[`${action.type}_fetchTimestamp`]);
  window[`${action.type}_fetchTimestamp`] = undefined;
  throw new Error(JSON.stringify({
    status: 'fetcherror',
    message: data.error,
    api_code: data.api_code,
  }));
  // Not Found
}

/**
 * 超时处理
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function timeoutHandle(timeout, action) {
  clearTimeout(window[`${action.type}_fetchTimeoutId`]);
  window[`${action.type}_fetchTimeoutId`] = undefined;
  const p = new Promise((resolve, reject) => {
    window[`${action.type}_fetchTimeoutId`] = setTimeout(() => {
      reject({
        status: 'fetcherror',
        message: '请求超时',
        erroraction: action,
      });
    }, timeout);
  }).catch((err) => {
    throw new Error(JSON.stringify(err));
  });

  return p;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// GET /api/v1/dashboard
export default async function request(action, { mode = 'wait', timeout = 10000 }, params) {
  // 请求时间戳
  const timestamp = new Date().getTime();
  console.log(timestamp);

  // 等待上一个请求完成
  if (mode === 'wait' && window[`${action.type}_fetchTimestamp`]) {
    throw new Error(JSON.stringify({
      status: 'fetcherror',
      message: '等待上一个请求完成',
    }));
  }

  // 停止上一个请求，仅使用新请求的返回值
  if (mode === 'stop' && window[`${action.type}_fetchTimestamp`]) {
    window[`${action.type}_fetchTimestamp`] = timestamp;
  }

  // 干净的请求
  if (window[`${action.type}_fetchTimestamp`] === undefined) {
    window[`${action.type}_fetchTimestamp`] = timestamp;
  }

  // 请求和超时赛跑
  const response = await Promise.race([
    timeoutHandle(timeout, action),
    // fetch(params.Url, {
    //   method: 'POST',
    //   body: JSON.stringify(params),
    // }),
    fetch('/api/v1/dashboard', {
      method: 'GET',
    }),
  ]).then((res) => {
    clearTimeout(window[`${action.type}_fetchTimeoutId`]);
    window[`${action.type}_fetchTimeoutId`] = undefined;
    return res;
  }).catch((err) => {
    console.log(timestamp);
    console.log(window[`${action.type}_fetchTimestamp`]);
    window[`${action.type}_fetchTimestamp`] = undefined;
    throw err;
    // Error: {"status":"error","message":"请求超时"}
    // TypeError: Failed to fetch
  });

  // 不匹配的请求
  if (window[`${action.type}_fetchTimestamp`] !== timestamp) {
    console.log(timestamp);
    console.log(window[`${action.type}_fetchTimestamp`]);
    throw new Error(JSON.stringify({
      status: 'fetcherror',
      message: '被抛弃的请求',
    }));
  }

  // 验证请求状态
  checkStatus(response, action, timestamp);

  // 将请求返回值转为json
  const data = await response.json();

  // 验证请求结果
  checkData(data, action, timestamp);

  // 定义返回结果
  const ret = {
    data,
    headers: 10,
  };

  // 从请求返回值的头信息中获取信息
  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  // return 返回结果
  console.log(timestamp);
  console.log(window[`${action.type}_fetchTimestamp`]);
  window[`${action.type}_fetchTimestamp`] = undefined;
  return ret;
}