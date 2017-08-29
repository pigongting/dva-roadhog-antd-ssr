import React from 'react';
import { Router } from 'dva/router';
import routes from './routes';
// 处理 国际化地址 的函数
import { historyreplace, getpruepath, getlocalname } from './utils/localpath';

function RouterConfig({ history, app }) {
  const pruepath = getpruepath(window.location.pathname);
  
  // 对没有国际化的链接进行跳转
  historyreplace(history, pruepath);

  const localename = getlocalname(pruepath);

  app.model({
    namespace: 'ssr',
    state: {
      path: pruepath,
      locale: localename,
    },
  });

  return (
    <Router history={history} routes={routes(localename, app)} />
  );
}

export default RouterConfig;
