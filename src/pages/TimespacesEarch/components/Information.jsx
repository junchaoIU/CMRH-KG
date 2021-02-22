import styles from "../index.less";
import React,{ PureComponent } from "react";
import { connect } from 'dva';
import { Timeline,Tabs,Modal,message,Checkbox,Divider,Tag,Empty,Card,Button,Spin,Drawer } from 'antd';
import { ClockCircleTwoTone,FileSearchOutlined,PushpinTwoTone,TagsOutlined,EnvironmentTwoTone,CloudTwoTone  } from '@ant-design/icons';

const Emptying =
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
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
    indeterminate: true,
    visible: false,
    cardVisible: false,
    substance: [],
    loading: true,
    drawer: []
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

  showDrawer = (e) => {
    const drawerData = this.state.substance[e.currentTarget.value]
    this.setState({
      drawer: drawerData,
      visible: true
    })
  }


  onClose = () => {
    this.setState({
      visible: false
    })
  }
  // 实体信息
  onInformation = () => {
    const { detail } = this.props

    return (
      <div>
        {detail.length>0?<Timeline className={styles.time} mode={"left"}>
          {
            detail.map((item,index) => {
              return (
                <div>
                <Timeline.Item key={index} dot={<TagsOutlined style={{fontSize:'20px'}}/>}>
                  <p><PushpinTwoTone twoToneColor="#eb2f96" className={styles.icon}/>{item[0]}</p>
                  <p><ClockCircleTwoTone  twoToneColor="#52c41a" className={styles.icon}/>{item[1].substr(1)}</p>
                  <p><EnvironmentTwoTone  twoToneColor="#adc6ff" className={styles.icon}/>{item[2]}</p>
                  <p className={styles.detail} onClick={()=>this.onBack(item[3])}><CloudTwoTone twoToneColor="#87e8de" className={styles.icon}/>{item[3]}</p>
                </Timeline.Item>
                </div>
              )
            })
          }
        </Timeline> :Emptying}
      </div>

    )
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

  // 实体语料回溯
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
  onCloseBack = () => {
    this.setState({
      cardVisible: false
    })
  }
  render(){
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard}>
          <Tabs.TabPane tab="回溯时空信息" key="1" className={styles.innerCard}>
            {this.onInformation()}
            <Drawer
              title="事件语料回溯"
              placement="right"
              closable={false}
              width={'35%'}
              onClose={this.onCloseBack}
              visible={this.state.cardVisible}
            >
              {this.onSubstance()}
            </Drawer>
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
        </Tabs>
      </div>
    )
  }

}

export default information
