const initstate = {};

export default {
  namespace: 'users',
  state: initstate,
  reducers: {
    forEach(items, callback) {
      for (let index = 0; index < items.length; index++) {
        console.log(items[index]);
        callback(items[index]);
      }
    },
  },
  effects: {},
  subscriptions: {},
};
