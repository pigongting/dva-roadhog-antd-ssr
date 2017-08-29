const { config, posts } = require('../data/common');

const { apiPrefix } = config;
const database = posts;

module.exports = {

  [`GET ${apiPrefix}/posts`](req, res) {
    const { query } = req;
    const { ...other } = query;
    let { pageSize, page } = query;
    pageSize = pageSize || 10;
    page = page || 1;

    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1;
          }
          return true;
        });
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },
};
