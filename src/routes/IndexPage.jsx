import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
// import { Button } from 'antd';
// <Button type="primary">Primary</Button>
// <Button>Default</Button>
// <Button type="dashed">Dashed</Button>
// <Button type="danger">Danger</Button>



// 内容国际化支持
// import { FormattedMessage } from 'react-intl';
// <p><FormattedMessage id="hello" defaultMessage="无语言包" /></p>

// import { DatePicker } from 'antd';
// const { MonthPicker, RangePicker } = DatePicker;
// <div>
//   <DatePicker onChange={onChange} />
//   <br />
//   <MonthPicker onChange={onChange} placeholder="Select month" />
//   <br />
//   <RangePicker onChange={onChange} />
// </div>


function onChange(date, dateString) {
  console.log(date, dateString);
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);
    
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
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
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
  console.log(state);
  return {
    loading: state.loading.effects['index/fetch'],
    pagedata: state.index
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
