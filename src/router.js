import React from 'react';
import { Router } from 'dva/router';
import routes from './routes';

function RouterConfig({ history, app }) {

  let locale = 'zh';

  const pathname = (window.location.pathname).replace(/\/$/, '');
  const localeReg = new RegExp("/en/|/zh/");

  if (!localeReg.test(pathname)) {
    if (pathname === '') {
      history.replace('/zh/index');
    } else {
      history.replace('/zh'+ pathname);
    }
  }

  if (localeReg.test(pathname)) {
    locale = pathname.split('/')[1];
  }

  app.model({
    namespace: 'ssr',
    state: {
      path: pathname,
      locale: locale,
    },
  });

  return (
    <Router history={history} routes={routes(locale, app)} />
  );
}

export default RouterConfig;
