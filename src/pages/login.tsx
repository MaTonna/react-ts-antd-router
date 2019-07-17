import React, { Component, ReactNode } from 'react';

import ReactDOM from 'react-dom';

class Login extends Component {
  render(): ReactNode {
    return (
      <div>登录页</div>
    )
  }
}

ReactDOM.render(<Login />, document.getElementById('root'));
