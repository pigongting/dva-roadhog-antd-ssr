import React from 'react';
import dva from 'dva';
import Loading from 'dva-loading';
import { RouterContext } from 'dva/router';

function createApp({ history, initialState }, id) {
  /*
  在调用的时候会传递着几个值进来
  history: {
   listenBefore: [Function: listenBefore],
   listen: [Function: listen],
   transitionTo: [Function: transitionTo],
   push: [Function: push],
   replace: [Function: replace],
   go: [Function: go],
   goBack: [Function: goBack],
   goForward: [Function: goForward],
   createKey: [Function: createKey],
   createPath: [Function: createPath],
   createHref: [Function: createHref],
   createLocation: [Function: createLocation],
   setState: [Function],
   registerTransitionHook: [Function],
   unregisterTransitionHook: [Function],
   pushState: [Function],
   replaceState: [Function],
   __v2_compatible__: true,
  }

  initialState: { app: { SSR_ENV: { platform: 'pc' } } }

  id: o2vinrk9qb
  */

  const app = dva({ history, initialState });

  app.model({
    namespace: 'app',
    state: {},
  });

  app.use(Loading({
    namespace: 'loading',
    effects: true,
  }));

  app.router(({ renderProps }) => {
    return <RouterContext history {...renderProps} />;
  });

  return app;
}

export default createApp;
