import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Switch, Row, Col, Divider, Alert, Icon } from "antd";
import { toggleSettingPanel, changeSetting } from "@/store/actions";

const RightPanel = (props) => {
  const {
    settingPanelVisible,
    toggleSettingPanel,
    changeSetting,
    sidebarLogo: defaultSidebarLogo,
    fixedHeader: defaultFixedHeader,
    tagsView: defaultTagsView,
  } = props;

  const [sidebarLogo, setSidebarLogo] = useState(defaultSidebarLogo);
  const [fixedHeader, setFixedHeader] = useState(defaultFixedHeader);
  const [tagsView, setTagsView] = useState(defaultTagsView);

  const sidebarLogoChange = (checked) => {
    setSidebarLogo(checked);
    changeSetting({ key: "sidebarLogo", value: checked });
  };

  const fixedHeaderChange = (checked) => {
    setFixedHeader(checked);
    changeSetting({ key: "fixedHeader", value: checked });
  };

  const tagsViewChange = (checked) => {
    setTagsView(checked);
    changeSetting({ key: "tagsView", value: checked });
  };

  return (
    <div className="rightSettings">
      <Drawer
        title="系统设置"
        placement="right"
        width={350}
        onClose={toggleSettingPanel}
        visible={settingPanelVisible}
      >
        <Row>
          <Col span={12}>
            <span>侧边栏 Logo</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={sidebarLogo}
              onChange={sidebarLogoChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>固定 Header</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={fixedHeader}
              onChange={fixedHeaderChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>开启 Tags-View</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={tagsView}
              onChange={tagsViewChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={24}>
            <Alert
              message="开发者请注意:"
              description="配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改/src/defaultSettings.js配置文件"
              type="warning"
              showIcon
              icon={<Icon type="notification" />}
              style={{ marginBottom: "16px" }}
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings,
  };
};

export default connect(mapStateToProps, { toggleSettingPanel, changeSetting })(
  RightPanel
);
