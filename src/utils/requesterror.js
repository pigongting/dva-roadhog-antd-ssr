export function retry(dispatch, frommodel) {
  setTimeout(() => {
    const pathname = window.location.pathname.replace(/[/]/g, '_');
    const errorActionHook = `fetchErrorActionHook${pathname}`;

    for (const i in window[errorActionHook]) {
      if (window[errorActionHook][i]) {
        const item = window[errorActionHook][i];

        if (frommodel) {
          const namespaceReg = new RegExp(`${item.namespace}/`);
          item.type = (item.type).replace(namespaceReg, '');
        }

        dispatch(item);
      }
    }

    window[errorActionHook] = {};
  }, 300);
}

export default function onError(e, dispatch) {
  let pathname = '';
  let errorActionHook = '';

  if (typeof window !== 'undefined') {
    pathname = window.location.pathname.replace(/[/]/g, '_');
    errorActionHook = `fetchErrorActionHook${pathname}`;
  }

  let msg = null;
  try {
    msg = JSON.parse(e.message);
  } catch (error) {
    msg = e.message;
  }

  console.log(msg);

  // fetch错误统一处理
  if (msg.status === 'fetcherror') {
    switch (msg.message) {
      case '被抛弃的请求':
      case '请求超时':
        console.log(msg.message);
        break;
      default:
        break;
    }

    // 超时和请求错误允许重试
    if (msg.erroraction) {
      const action = msg.erroraction;

      // 取出 namespace
      const namespace = action.type.split('/')[0];

      // 保存 namespace
      action.namespace = namespace;

      // 保存错误请求
      if (typeof window !== 'undefined')
      {
        if (!global[errorActionHook]) {
          global[errorActionHook] = {};
        }
        global[errorActionHook][action.type] = action;
      }

      // 触发显示 retry 按钮的动作
      dispatch({ type: `${namespace}/fetcherror`, erroraction: action });
    }

    // 接口错误提示错误原因
    if (msg.api_code) {
      console.log(msg.message);
    }
  }
}
