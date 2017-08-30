import update from 'immutability-helper';
import * as usersService from '../services/index';
// 处理 国际化地址 的函数
import { removelocal } from '../utils/localpath';
// 处理 onError 的函数
import { retry } from '../utils/requesterror';

const initstate = {};

export default {
  namespace: 'index',
  state: initstate,
  reducers: {
    fetcherror(state, action) {
      // console.log(state);
      // console.log(action);
      // console.log(update);
      return { ...state };
    },
  },
  effects: {
    *fetch(action, { call, put, select }) {
      const { productinfo } = yield select(state => state.index);
      const { data, headers } = yield call(usersService.fetch, action, {}, {});
      yield put({ type: 'save', payload: data });

      return { productinfo, data, headers };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // setTimeout(() => {
      //   retry(dispatch, true);
      // }, 5000);

      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === '/index') {
          dispatch({ type: 'fetch', payload: query });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },
};
