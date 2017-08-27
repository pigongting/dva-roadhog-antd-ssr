import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

// 内容国际化支持
import { FormattedMessage, FormattedNumber } from 'react-intl';
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

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    // if (typeof window !== 'undefined') {
    //   import(/* webpackChunkName: "lodash" */ 'lodash')
    //   .then(_ => {
    //     console.log(149174);
    //   })
    //   .catch(err => console.log('Failed to load moment', err));
    // }
  }

  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <p><FormattedMessage id="superHello" defaultMessage="无语言包" values={ { someone: 'pigongting' } } /></p>
        <FormattedNumber value={1000} />
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
        <Link to={`/${this.props.locale}/users/product`}>Users</Link>
        <div>
          <DatePicker onChange={onChange} />
          <br />
          <MonthPicker onChange={onChange} placeholder="Select month" />
          <br />
          <RangePicker onChange={onChange} />
        </div>
      </div>
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
    locale: state.ssr.locale
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(pageWithIntl(IndexPage));
