import ssr from 'express-dva-ssr';
import React from 'react';
import { Route, IndexRoute } from 'dva/router';
import createApp from './createApp';
import App from '../src/routes/App';
import IndexPage from '../src/routes/IndexPage';
import renderFullPage from './renderFullPage';

const routes = (
  <div>
    <Route path="/" component={App} >
      <IndexRoute component={IndexPage} />
    </Route>
  </div>
);

function onRenderSuccess() {
}

export default ssr.runtimeSSRMiddle({
  routes,
  createApp,
  renderFullPage,
  onRenderSuccess,
  initialState: {},
});
