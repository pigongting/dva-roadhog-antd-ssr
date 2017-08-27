import React from 'react';
import { Router } from 'dva/router';
import App from './routes/App';

function RouterConfig({ history, app }) {

  let locale = 'zh';

  const pathname = window.location.pathname;
  const localeReg = new RegExp("/en/|/zh/");

  if (localeReg.test(pathname)) {
    locale = pathname.split('/')[1];
  }

  app.model({
    namespace: 'locale',
    state: locale
  });

  const routes = [
    {
      path: '/',
      indexRoute: { onEnter: (nextState, replace) => replace(`/${locale}/index`) },
    },
    {
      path: `/${locale}/index`,
      component: App,
      getIndexRoute (nextState, cb) {
        import(/* webpackChunkName: "IndexPage" */ './routes/IndexPage')
        .then((data) => {
          cb(null, { component: data });
        })
        .catch(err => console.log('Failed to load IndexPage', err));
      },
    },
    {
      path: `/${locale}/users`,
      getComponent (nextState, cb) {
        import(/* webpackChunkName: "Users" */ './routes/Users')
        .then((data) => {
          cb(null, data);
        })
        .catch(err => console.log('Failed to load Users', err));
      },
    }
  ];

  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
