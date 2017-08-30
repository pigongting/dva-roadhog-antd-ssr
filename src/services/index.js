import request from '../utils/request';

export function fetch(action, config, options) {
  return request(action, config, { Url: 'http://jsonplaceholder.typicode.com/posts/1' });// /api/v1/dashboard
}
