import ssr from 'express-dva-ssr';
import React from 'react';
import createApp from './createApp';
import renderFullPage from './renderFullPage';
import routes from '../src/routes';

// 处理 国际化地址 的中间件
import { getpruepath, getlocalname } from '../src/utils/localpath';

function onRenderSuccess({ html, url, env, state}) {
  // console.log(html);
  // console.log(url);
  // console.log(env);
  // console.log(state);
}

function runtimeSSRMiddleWarp(req, res, next) {
  const pruepath = getpruepath(req._parsedUrl.pathname);
  const localename = getlocalname(pruepath);

  ssr.runtimeSSRMiddle({
    routes: routes(localename),
    createApp,
    renderFullPage,
    onRenderSuccess,
    initialState: {
      ssr: {
        path: pruepath,
        locale: localename,
      },
    },
  })(req, res, next);
}

export default runtimeSSRMiddleWarp;
