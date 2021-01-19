import { ForkOutlined,DeploymentUnitOutlined,ShareAltOutlined } from '@ant-design/icons';
import styles from "@/pages/KnowledgeSearch/index.less";
import React,{ PureComponent } from "react";
import { Row, Tabs,Avatar, Image,Typography,Tag,Card,Col } from 'antd';

class information extends PureComponent{
  render(){
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard}>
          <Tabs.TabPane tab="实体信息" key="1" className={styles.innerCard}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="知识简介" key="1">
                <Avatar
                  size={64}
                  src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                />
                <span className={styles.author}>孙中山</span>
                <Typography.Paragraph>
                  Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                  Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                  a design language for background applications, is refined by Ant UED Team. Ant Design, a
                  design language for background applications, is
                </Typography.Paragraph>
              </Tabs.TabPane>
              <Tabs.TabPane tab="详细信息" key="2">
                {
                  [1,2,3,4,4,5,2,3,1,2,3,4,4,5,2,3].map(function (item,index) {
                    return (
                      <Tag className={styles.detail} color="blue" key={index}>哈哈哈哈哈哈</Tag>
                    )})
                }
              </Tabs.TabPane>
              <Tabs.TabPane tab="相关事件" key="3">
                <div style={{overflow:"auto",height:'400px',marginRight:'5px'}} >
                {
                  [1,2,3,4,4,5,2,3,1,2,3,4,4,5,2,3,3,4,4,3,3,3,3].map(function (item,index) {
                    return (
                      <div style={{float:'left'}}>
                      <Avatar
                        style={{marginBottom:'5px'}}
                        size={64}
                        src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      />
                        <p><Tag className={styles.detail} color="gold">护法运动护法</Tag></p>
                      </div>
                    )})
                }
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="相关人物" key="4">
                {
                  [1,2,3,4,4,5,2,3,1,2,3,4,4,5,2,3].map(function (item,index) {
                    return (
                      <div style={{float:'left'}}>
                        <Avatar
                          style={{marginBottom:'5px'}}
                          size={64}
                          src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        />
                        <p><Tag className={styles.detail} color="green">护法运动护法</Tag></p>
                      </div>
                    )})
                }
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
          <Tabs.TabPane tab="实体语料回溯" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </Tabs.TabPane>
          <Tabs.TabPane tab="三元组语料回溯" key="3">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }

}

export default information
