import React from 'react';
import { Router } from 'dva/router';

import App from './routes/App';

// ant 组件的国际化支持
// import { LocaleProvider } from 'antd';
// import enUS from 'antd/lib/locale-provider/en_US';
// <LocaleProvider locale={enUS}></LocaleProvider>

// 内容国际化支持
// import intl from 'intl';
// import {addLocaleData, IntlProvider} from 'react-intl';
// import en from 'react-intl/locale-data/en';
// import zh from 'react-intl/locale-data/zh';

// // 自定义语言文件
// import zh_CN from './locales/zh-CN';
// import en_US from './locales/en-US';

// // 内容国际化-添加支持语言
// addLocaleData([...zh, ...en]);
// <IntlProvider locale="zh-CN" messages={zh_CN}></IntlProvider>


function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        import(/* webpackChunkName: "IndexPage" */ './routes/IndexPage')
        .then((data) => {
          cb(null, { component: data });
        })
        .catch(err => console.log('Failed to load IndexPage', err));
      },
    },
  ];

  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
