import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

// 内容国际化支持
import { FormattedMessage } from 'react-intl';
import pageWithIntl from '../locales/PageWithIntl'

// 本页样式
import styles from './IndexPage.css';

// antd 组件
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;

// import { Button } from 'antd';
// <Button type="primary">Primary</Button>
// <Button>Default</Button>
// <Button type="dashed">Dashed</Button>
// <Button type="danger">Danger</Button>

function onChange(date, dateString) {
  console.log(date, dateString);
}

class Users extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this);

    if (typeof window !== 'undefined') {
      import(/* webpackChunkName: "lodash" */ 'lodash')
      .then(_ => {
        console.log(149174);
      })
      .catch(err => console.log('Failed to load moment', err));
    }
  }

  render() {
    return (
      <div>Users</div>
    );
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    getBanner : () => {
      dispatch({
        type: 'index/fetchbanner'
      });
    },
    onEndReached : (isLoading) => {
      if (!isLoading) {
        dispatch({
          type: 'index/fetch'
        });
      }
    }
  }
}

function mapStateToProps(state, ownProps) {
  // console.log('state>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  // console.log(state);
  return {
    loading: state.loading.effects['index/fetch'],
    pagedata: 'state.index',
    locale: state.locale
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(pageWithIntl(Users));
