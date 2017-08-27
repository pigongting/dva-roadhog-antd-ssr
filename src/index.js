import dva from 'dva';
import { browserHistory } from 'dva/router';

// 根据 fetch 状态值会自动变化
import Loading from 'dva-loading';

// 每个 dispatch 时都会在控制台输出友好的信息
// import { createLogger } from 'redux-logger'
// onAction: [createLogger()]

// 处理 onError 的函数
import onError from './utils/dvaOnError';

// 模板文件
import '../public/index.html';

// 性能分析
import Perf from 'react-addons-perf';
window.Perf = Perf;

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError,
  initialState: { app: { SSR_ENV: { platform: 'pc' } } },
});

// 2. Plugins
app.use(Loading({
  namespace: 'loading',
  effects: true,
}));

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
