import ssr from 'express-dva-ssr';
import React from 'react';
import { Route, IndexRoute } from 'dva/router';
import createApp from './createApp';
import App from '../src/routes/App';
import renderFullPage from './renderFullPage';

function onRenderSuccess({ html, url, env, state}) {
  // console.log(html);
  // console.log(url);
  // console.log(env);
  // console.log(state);
}

function runtimeSSRMiddleWarp(req, res, next) {
  let locale = 'zh';

  const localeReg = new RegExp("/en/|/zh/");

  if (localeReg.test(req.url)) {
    locale = req.url.split('/')[1];
  }

  const routes = [
    {
      path: '/',
      indexRoute: { onEnter: (nextState, replace) => replace(`/${locale}/index`) },
    },
    {
      path: `/${locale}/index`,
      component: App,
      getIndexRoute (nextState, cb) {
        cb(null, { component: require('../src/routes/IndexPage') });
      },
    }
  ];

  ssr.runtimeSSRMiddle({
    routes,
    createApp,
    renderFullPage,
    onRenderSuccess,
    initialState: {
      locale: locale
    },
  })(req, res, next)
}

export default runtimeSSRMiddleWarp;
