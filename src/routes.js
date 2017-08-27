import React from 'react';
import App from './routes/App';
import Content from './routes/Content';

function registerModel(app, model) {
  if (app && !(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

function Routes(locale, app) {
  return [
    {
      path: `/${locale}/index`,
      component: App,
      getIndexRoute (nextState, cb) {
        if (process.env.NODE_ENV === 'development') {
          import(/* webpackChunkName: "IndexPage" */ './routes/IndexPage')
          .then((data) => {
            registerModel(app, require(`./models/index`));
            cb(null, { component: data });
          })
          .catch(err => console.log('Failed to load IndexPage', err));
        } else {
          registerModel(app, require(`./models/index`));
          cb(null, { component: require(`./routes/IndexPage`) });
        }
      },
    },
    {
      path: `/${locale}/users`,
      component: Content,
      getIndexRoute (nextState, cb) {
        if (process.env.NODE_ENV === 'development') {
          import(/* webpackChunkName: "Users" */ './routes/Users')
          .then((data) => {
            registerModel(app, require(`./models/users`));
            cb(null, { component: data });
          })
          .catch(err => console.log('Failed to load Users', err));
        } else {
          registerModel(app, require(`./models/users`));
          cb(null, {component: require(`./routes/Users`) });
        }
      },
      childRoutes: [
        {
          path: 'product',
          getComponent (nextState, cb) {
            if (process.env.NODE_ENV === 'development') {
              import(/* webpackChunkName: "Product" */ './routes/Product')
              .then((data) => {
                registerModel(app, require(`./models/users/product`));
                cb(null, data);
              })
              .catch(err => console.log('Failed to load Product', err));
            } else {
              registerModel(app, require(`./models/users/product`));
              cb(null, require(`./routes/Product`));
            }
          },
        }
      ],
    },
  ];
}

export default Routes;
