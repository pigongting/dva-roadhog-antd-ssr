import ssr from 'express-dva-ssr';
import React from 'react';
import createApp from './createApp';
import renderFullPage from './renderFullPage';
import routes from '../src/routes';

function onRenderSuccess({ html, url, env, state}) {
  // console.log(html);
  // console.log(url);
  // console.log(env);
  // console.log(state);
}

function runtimeSSRMiddleWarp(req, res, next) {
  let locale = 'zh';

  const localeReg = new RegExp("/en/|/zh/");
  const pathname = (req._parsedUrl.pathname).replace(/\/$/, '');

  if (localeReg.test(pathname)) {
    locale = pathname.split('/')[1];
  }

  ssr.runtimeSSRMiddle({
    routes: routes(locale),
    createApp,
    renderFullPage,
    onRenderSuccess,
    initialState: {
      ssr: {
        path: pathname,
        locale: locale,
      },
    },
  })(req, res, next)
}

export default runtimeSSRMiddleWarp;
