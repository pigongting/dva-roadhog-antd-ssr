import React from 'react';
import { connect } from 'dva';

import NProgress from 'nprogress';
import './App.less';

let lastHref

const App = ({ children, dispatch, app, loading, location }) => {
	
	
	
	if (typeof window !== 'undefined') {
		const href = window.location.href

	  if (lastHref !== href) {
	    NProgress.start()
	    if (!loading.global) {
	      NProgress.done()
	      lastHref = href
	    }
	  }
	}

  return (
    <div>{children}</div>
  )
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
