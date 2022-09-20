import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin,Tabs } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import bnuz_logo from '../../assets/images/bnuz_logo.png';
const { TabPane } = Tabs;

const Login = (props) => {
  console.log(props)
  const { form, token, login, getUserInfo } = props;

  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(username, password)
      .then((data) => {
        // message.success("欢迎使用");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  // 获取用户信息
  const handleUserInfo = (token) => {
    console.log(token)
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };

  if(token){
    if(token.length!==11){
      console.log(token)
      handleLogin("admin","123456")
    }else if(token.length===11){
      return <Redirect to="/dashboard" />;
    }
  }else{
    handleLogin("admin", "123456")
    window.location.reload()
    return <Redirect to="/dashboard" />;
  }

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title={"用户登录"}>
      <div className="login-container">
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <div className="h2">广州革命历史数字图书馆</div>
            <img style={{height:33.5,width:140.5}} src={bnuz_logo}  alt="北京师范大学.珠海"/>
          </div>
          <Spin spinning={loading} tip="登录中...">
            <Tabs defaultActiveKey="1" style={{textAlign: 'center'}}>
                <TabPane tab="用户登陆" key="1">
                  <Form.Item>
                    {getFieldDecorator("username", {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入用户名",
                        },
                      ],
                      initialValue: "admin", // 初始值
                    })(
                      <Input
                        prefix={
                          <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        placeholder="用户名"
                        className="ant-botton"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入密码",
                        },
                      ],
                      initialValue: "123456", // 初始值
                    })(
                      <Input
                        prefix={
                          <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        type="password"
                        placeholder="密码"
                        className="ant-botton"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      登录
                    </Button>
                  </Form.Item>
                </TabPane>
            </Tabs>
          </Spin>
        </Form>
        <footer className="footer">
          Copyright©2020 北京师范大学珠海分校管理学院 版权所有<br/>
          <a href="http://beian.miit.gov.cn/">粤ICP备2020089302号-1</a>
        </footer>
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);
