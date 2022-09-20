import React from "react";
import { connect } from "react-redux";
import { Icon, Menu, Dropdown, Modal, Layout, Avatar, Divider} from "antd";
import { Link } from "react-router-dom";
import { logout, getUserInfo } from "@/store/actions";
import UpdataList from  "./upDataList"
import FullScreen from "@/components/FullScreen";
import Logo from '../Sider/Logo/index';
import "./index.less";
const { Header } = Layout;

const Svg1 = () => (
    <span className="iconfont" >&#xe602;</span>
)
// const Svg2 = () => (
//     <span className="iconfont" >&#xe66d;</span>
// )
const Svg3 = () => (
    <span className="iconfont" >&#xe600;</span>
)
const Svg4 = () => (
    <span className="iconfont" >&#xe624;</span>
)
const Svg5 = () => (
    <span className="iconfont" >&#xe680;</span>
)

const Svg6 = () => (
    <span className="iconfont" >&#xe6df;</span>
)

const LayoutHeader = (props) => {

  const {
    token,
    avatar,
    sidebarCollapsed,
    logout,
    getUserInfo,
    fixedHeader,
  } = props;
  token && getUserInfo(token);
  const handleLogout = (token) => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        logout(token);
      },
    });
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">首页</Link>
      </Menu.Item>
      <Menu.Item key="project">
        <a
          target="_blank"
          href="http://www.bnuz.edu.cn/"
          rel="noopener noreferrer"
        >
          学校官网
        </a>
      </Menu.Item>
      {/*<Menu.Divider />*/}
      {/*<Menu.Item key="logout">注销</Menu.Item>*/}
    </Menu>
  );
  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)",
          boxShadow: "0 2px 8px #f0f1f2",
          height:70,
          position:"fixed"
        };
      } else {
        styles = {
          width: "calc(100% - 200px)",
          boxShadow: "0 2px 8px #f0f1f2",
          height:70,
          position:"fixed"
        };
      }
    } else {
      styles = {
        width: "100%",
        boxShadow: "0 2px 8px #f0f1f2",
        height:70,
        position:"fixed"

      };
    }
    return styles;
  };

  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        //className={fixedHeader ? "fix-header" : ""}
      >
        <Menu
            mode="horizontal"
            style={{ lineHeight: '60px',fontWeight:"bold",fontFamily:"Microsoft YaHei",fontSize:"16px"}}
            //theme="dark"
            //onSelect={handleMenuSelect()}
            //selectedKeys={[path]}
            //defaultOpenKeys={openKey}
        >
          <Menu.Item key="1"><Logo /></Menu.Item>
          <Menu.Item key="2"><Link to="/dashboard">首页</Link></Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key="3"><Link to="/knowledgesearch"><Icon component={Svg1}/>知识检索</Link></Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key="4"><Link to="/relationsearch"><Icon component={Svg5}/>关系检索</Link></Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key="5"><Link to="/timespacesEarch"><Icon component={Svg6}/>时空检索</Link></Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key="6"><Link to="/back"><Icon component={Svg3}/>实体回溯检索</Link></Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key="7"><Link to="/textback"><Icon component={Svg4}/>语料回溯检索</Link></Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key="8"><Link to="/docs"><Icon component={Svg4}/>使用文档V1.0</Link></Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key="9"><UpdataList/></Menu.Item>
          <div className="right-menu">
            <FullScreen />
            {/*{showSettings ? <Settings /> : null}*/}
            <div className="dropdown-wrap">
              <Dropdown overlay={menu}>
                <div>
                  <Avatar shape="square" size="medium" src={avatar} />
                  <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
                </div>
              </Dropdown>
            </div>
          </div>
        </Menu>
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader);
