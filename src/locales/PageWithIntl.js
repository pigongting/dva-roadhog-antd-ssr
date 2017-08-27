import React, {Component} from 'react'

// ant 组件的国际化支持
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

// 内容国际化支持
import intl from 'intl';
import {IntlProvider, addLocaleData, injectIntl} from 'react-intl'

// 内容国际化
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

// 内容国际化-自定义语言文件
import zh_CN from './zh-CN';
import en_US from './en-US';

// 内容国际化-添加支持语言
addLocaleData([...zh, ...en]);

export default (Page) => {
  const IntlPage = injectIntl(Page)

  class PageWithIntl extends Component {
    constructor(props) {
      super(props);
    }

    AntdMessages(locale) {
      switch(locale){
        case 'zh':
          return { exist: true };
          break;
        case 'en':
          return enUS;
          break;
        default:
          return { exist: true };
          break;
      }
    }

    IntlMessages(locale) {
      switch(locale){
        case 'zh':
          return zh_CN;
          break;
        case 'en':
          return en_US;
          break;
        default:
          return zh_CN;
          break;
      }
    }

    render () {
      const { ...props } = this.props;
      return (
        <LocaleProvider locale={this.AntdMessages(this.props.locale)}>
          <IntlProvider locale={this.props.locale} messages={this.IntlMessages(this.props.locale)}>
            <IntlPage {...props} />
          </IntlProvider>
        </LocaleProvider>
      )
    }
  }

  return PageWithIntl;
}
