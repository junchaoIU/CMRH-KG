import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Logo from "./Logo";
import Menu from "./Menu";
const { Sider } = Layout;

const LayoutSider = (props) => {
  const { sidebarCollapsed, sidebarLogo } = props;
  return (
      <div>
        {/*<Logo />*/}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
    // <Sider
    //   collapsible
    //   collapsed={sidebarCollapsed}
    //   trigger={null}
    //   style={{ zIndex: "10" }}
    // >
    //   {sidebarLogo ? <Logo /> : null}
    //   <Menu />
    // </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings,
  };
};
export default connect(mapStateToProps)(LayoutSider);
