import update from 'immutability-helper';
import * as usersService from '../services/index';

const initstate = {
  show: 'true',
  productlist: [],
  productinfo: {
    PageCount: Infinity,
    RowsCount: Infinity,
    CurrentPage: 0,
    PageSize: 3,
  },
  banner: [],
};

export default {

  namespace: 'example',

  state: initstate,

  reducers: {
    resetstate(state) {
      console.log(state);
      console.log(initstate);
      return initstate;
    },
    save(state, data) {
      return update(state, {
        show: {
          $set: false,
        },
        productlist: {
          $push: [
            {
              img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
              title: 'Meet hotel',
              des: '不是所有的兼职汪都需要风吹日晒',
              timestamp: Math.random(),
            },
          ]
        },
      });
    },
  },

  effects: {
    *fetch(action, { call, put, select }) {  // eslint-disable-line
      const productinfo = yield select(state => state.index.productinfo);

      const { data, headers } = yield call(usersService.fetch, action, {}, {
        nextPage: (productinfo.CurrentPage + 1),
      });

      yield put({ type: 'save', data: data });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          // dispatch({ type: 'fetch', payload: query });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
