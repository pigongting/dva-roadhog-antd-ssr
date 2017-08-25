import React from 'react';
import { connect } from 'dva';

import NProgress from 'nprogress';
import './App.less';

let lastHref

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);
    
		if (typeof window !== 'undefined') {
			const href = window.location.href

		  if (lastHref !== href) {
		    NProgress.start()
		    if (!this.props.loading.global) {
		      NProgress.done()
		      lastHref = href
		    }
		  }
		}
    
  }

  render() {
  	return (
	    <div>{this.props.children}</div>
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
    loading: state.loading,
    pagedata: state.index
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);