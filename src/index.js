import dva from 'dva';
import { browserHistory } from 'dva/router';

import Loading from 'dva-loading';
// import { createLogger } from 'redux-logger';

import '../public/index.html';

// 1. Initialize
const app = dva({
  history: browserHistory,
  // onAction: [createLogger()],
  onError(e, dispatch) {
    const pathname = window.location.pathname.replace(/[/]/g, '_');
    const errorActionHook = `fetchErrorActionHook${pathname}`;

    let msg = null;
    try {
      msg = JSON.parse(e.message);
    } catch (error) {
      msg = e.message;
    }

    console.log(msg);

    // fetch错误统一处理
    if (msg.status === 'fetcherror') {
      switch (msg.message) {
        case '被抛弃的请求':
        case '请求超时':
          console.log(msg.message);
          break;
        default:
          break;
      }

      // 超时和请求错误允许重试
      if (msg.erroraction) {
        const action = msg.erroraction;

        // 保存错误请求
        if (!window[errorActionHook]) {
          window[errorActionHook] = {};
        }

        window[errorActionHook][action.type] = action;

        dispatch({
          type: 'users/addRemote',
          payload: true,
        });
      }

      // 接口错误提示错误原因
      if (msg.api_code) {
        alert(msg.message);
      }
    }
  },
});

// 2. Plugins
app.use(Loading({
  namespace: 'loading',
  effects: true,
}));

// 3. Model
// 在 router.jsx 中动态写入

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
