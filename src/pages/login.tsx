import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Button, Icon, Form, Modal } from 'antd';
import '@styles/login.less';

const FormItem = Form.Item;

class LoginPage extends React.Component {

  handleLogin = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // document.getElementById('loginForm').submit();
      }
    });
  };

  refreshCode = () => {
    // document.getElementById('validateCodeImg').src = `${CONFIG.validateImg}?${new Date().valueOf()}`;
  };

  loginUserName = (rule, value, callback) => {
    !value && callback('请输入用户名');
    !/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value) && callback('只能输入中文、英文及阿拉伯数字');
    callback();
  };

  loginPassword = (rule, value, callback) => {
    !value && callback('请输入登录密码');
    !/^[a-zA-Z0-9\!\@\#\$\_\.\%\^\&\*\(\)]+$/.test(value) && callback('请输入正确格式的密码');
    callback();
  };

  componentDidMount = () => {
    // CONFIG.errorMessage &&
    //   Modal.error({
    //     title: '提示',
    //     content: CONFIG.errorMessage,
    //   });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const inputStyle = { color: 'rgba(0,0,0,.25)' };

    return (
      <div className="login-content">
        <div className="login-header">
          <div className="login-logo" />
          <p className="login-title">KK体育</p>
        </div>

        <Form id="loginForm" method="POST">
          <FormItem>
            {getFieldDecorator('loginName', {
              rules: [{ validator: this.loginUserName }],
            })(
              <Input
                prefix={<Icon type="user" style={inputStyle} />}
                name="loginName"
                placeholder="请输入用户名"
                maxLength={20}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('loginPassword', {
              rules: [
                { min: 6, message: '密码至少为6位' },
                { max: 20, message: '密码最多为20位' },
                { validator: this.loginPassword },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={inputStyle} />}
                type="password"
                name="loginPassword"
                placeholder="请输入密码"
                maxLength={20}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('checkCode', {
              rules: [{ required: true, message: '请输入数字验证码!' }],
            })(
              <div className="login-validate">
                <Input
                  prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  style={{ width: '125px' }}
                  name="checkCode"
                  placeholder="请输入验证码"
                  maxLength={4}
                  minLength={4}
                />
                <img
                  id="validateCodeImg"
                  className="login-validate-img"
                  alt="validateImg"
                  onClick={this.refreshCode}
                />
                <p className="login-validate-refresh" onClick={this.refreshCode}>
                  看不清？点击更新图片
                </p>
              </div>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" onClick={this.handleLogin} className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const LoginPageForm = Form.create()(LoginPage);

ReactDOM.render(<LoginPageForm />, document.getElementById('root'));
