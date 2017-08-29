import lodash from 'lodash';
import classnames from 'classnames';
import request from './request';
import config from '../../config/config';
import { color } from '../../config/theme';

// 连字符转驼峰
String.prototype.hyphenToHump = () => {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = () => {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};

// 日期格式化
Date.prototype.format = (format) => {
  let formatresult;

  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };

  if (/(y+)/.test(format)) {
    formatresult = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      formatresult = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length));
    }
  }

  return formatresult;
};

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
};

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  const data = lodash.cloneDeep(array);
  const result = [];
  const hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      if (!hashVP[children]) {
        (hashVP[children] = []);
      }
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
};
