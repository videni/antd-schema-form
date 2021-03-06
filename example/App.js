import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { hot } from 'react-hot-loader';
import style from './style.sass';
import Form from './modules/Form';

/* 热替换 */
@hot(module)
class App extends Component {
  render() {
    return (
      <LocaleProvider locale={ zhCN }>
        <div className={ style.box }>
          <Form />
        </div>
      </LocaleProvider>
    );
  }
}

export default App;