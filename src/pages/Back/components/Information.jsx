import styles from "../index.less";
import React,{ PureComponent } from "react";
import { connect } from 'dva';
import { Timeline,Tabs,Tooltip,BackTop,Col,Pagination,Row,Empty,Card,Button,Spin,Drawer } from 'antd';
import {
  ClockCircleTwoTone,
  CrownOutlined,
  PushpinTwoTone,
  TagsOutlined,
  EnvironmentTwoTone,
  CloudTwoTone
} from '@ant-design/icons';

const Emptying =
  <Empty
    style={{ height: '500px' }}
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 100,
      margin: '15% 0 0'
    }}
    description={
      <span>
        暂无数据
      </span>
    }
  >
  </Empty>

@connect(({ knowledge,loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))

class information extends PureComponent {
  state = {
    visible: false,
    cardVisible: false,
    substance: [],
    loading: true,
    drawer: [],
  };
  onDispatch = (backWord) => {
    const { dispatch } = this.props
    dispatch({
      type: 'knowledge/getSubstance',
      payload: backWord,
      callback: (response) => {
        if(response !== null) {
          this.setState({
            substance: response,
            loading: false
          })
        }
      }
    })
  }
  onBack = (search) => {
    this.setState({
      substance: [],
      loading: true
    })
    this.onDispatch(search)
    this.setState({
      cardVisible: true
    })
  }
  showDrawer = (e) => {
    const drawerData = this.state.substance[e.currentTarget.value]
    this.setState({
      drawer: drawerData,
      visible: true
    })
  }
  onSubstance = () => {
    const tip = this.state.substance.length > 0 ? this.state.substance[0].num : ''
    return (
      <Spin spinning={this.state.loading}>
        {
          this.state.substance.length > 0 ?
            <div className={styles.substanceDiv}>
              <Card size="small" title={tip}>
                {
                  this.state.substance.map((item,index) => {
                    return (
                      <Card hoverable key={index} className={styles.card}>
                        <div className={styles.bookImage}>
                          <img
                            style={{ height: '100px' }}
                            src={`http://39.101.193.14:2222//book/${item.fileName}.png`}
                          />
                        </div>
                        <p>{item.fileName}</p>
                        <p>简介</p>
                        <Button type={"primary"} value={index} onClick={this.showDrawer}>查看详情</Button>
                      </Card>
                    )
                  })
                }
              </Card>
            </div> : Emptying
        }
      </Spin>
    )
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }
  timeLine=()=>{
    const {childEvent:{series}}=this.props
    const onClose = () => {
      this.setState({
        cardVisible: false
      })
    }
    return(
      <Timeline className={styles.time} mode={"left"}>
        {
          series.map((item,index) => {
            return (
              <Timeline.Item key={index} dot={<TagsOutlined style={{ fontSize: '18px' }} />}>
                <p className={styles.text}><ClockCircleTwoTone twoToneColor="#52c41a" className={styles.icon} />
                  {item[0][0]}</p>
                <p className={styles.text}><EnvironmentTwoTone twoToneColor="#eb2f96" className={styles.icon} />{item[0][1]}</p>
                <Tooltip color={"#2db7f5"} placement="topLeft" title="点击事件语料回溯" arrowPointAtCenter>
                  <p className={styles.detail} onClick={() => this.onBack(`${item[0][0]}${item[0][1]}${item[0][3]}`)}>
                    <CloudTwoTone twoToneColor="#87e8de" className={styles.icon} />{item[0][3]}</p>
                </Tooltip>
              </Timeline.Item>
            )
          })
        }
        <Drawer
          title="事件语料回溯"
          placement="right"
          closable={false}
          width={'70%'}
          onClose={onClose}
          visible={this.state.cardVisible}
          getContainer={false}
          style={{ position: 'absolute',transform: 'none' }}
        >
          {this.onSubstance()}
        </Drawer>
      </Timeline>
    )
  }
  render(){
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard}>
          <Tabs.TabPane tab="事件时间线" key="1">
            {this.timeLine()}
            <Drawer
              title={this.state.drawer.fileName}
              placement="left"
              closable={false}
              width={'50%'}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <p style={{ letterSpacing: '1px' }}
                 dangerouslySetInnerHTML={{ __html: this.state.drawer.content }} />
            </Drawer>
          </Tabs.TabPane>
          <Tabs.TabPane tab="事件信息" key="2">
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }

}

export default information
