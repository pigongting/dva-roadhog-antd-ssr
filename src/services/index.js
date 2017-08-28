import request from '../utils/request';

export function fetch(action, config, options) {
  return request(action, config, { Url: '/api/v1/dashboard' });
}
