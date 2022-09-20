import React from "react";
import { Icon,Timeline,Button,Drawer } from "antd";
import "./index.less";


class UpdataList extends React.Component{
  state = { visible: false };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
        <div>
          <Button type="primary" onClick={this.showDrawer}>
            更新日志
          </Button>
          <Drawer
              title="项目更新日志(有任何想法建议欢迎发送至邮箱wujunchaoIU@outlook.com，我们会综合您的意见进行系统的完善改进)"
              width={400}
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
          >
              <Timeline>
                  <Timeline.Item dot={<Icon type="clock-circle-o"/>}>
                      <p>拟解决问题：</p>
                      <p>数据推理完善</p>
                      <p>图片扩充完善</p>
                      <p>图片延伸检索</p>
                  </Timeline.Item>
                  <Timeline.Item color="red">
                      <p>2020.12.08</p>
                      <p>取消首页登录</p>
                      <p>用户token权限暂时全部为admin-token</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                      <p>2020.11.25</p>
                      <p>更新目录功能</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                      <p>2020.11.24</p>
                      <p>使用文档V1.0图片web化</p>
                      <p>目录锚点</p>
                  </Timeline.Item>
                  <Timeline.Item color="red">
                      <p>2020.11.23</p>
                      <p>首页布局收缩，header视觉优化</p>
                  </Timeline.Item>
                  <Timeline.Item color="red">
                      <p>2020.11.22</p>
                      <p>文献数据迁移到mysql数据库</p>
                      <p>文献阅览标题展示，页码追踪</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                      <p>2020.11.10</p>
                      <p>时空检索节点可视化优化</p>
                      <p>对子事件节点缩小和详细内容展示</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                      <p>2020.11.5</p>
                      <p>时空检索部分检索不到时间的bug修复</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                      <p>2020.10</p>
                      <p>文献量更新补充1000本</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                      <p>2020.9</p>
                      <p>时空检索模式上线</p>
                      <p>图片扩充，视觉优化</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                      <p>2020.8</p>
                      <p>提出基于N-ary的子事件时空检索</p>
                      <p>时空接口设计，测试完善</p>
                      <p>使用文档V1.0编写</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                      <p>...</p>
                  </Timeline.Item>

              </Timeline>
          </Drawer>
        </div>
    );
  }
}

export default UpdataList;