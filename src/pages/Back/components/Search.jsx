import React,{ PureComponent } from 'react';
import { Input,Tooltip,Spin,Empty,Button,message,Timeline,Col,Row } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import {
  SearchOutlined,
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

@connect(({ back,loading }) => ({
  back,
  submitting: loading.effects['back/back'],
}))
class search extends PureComponent {
  state = {
    val: false,
    searchValue: '',
    substance: [],
    loading: false,
    drawer: [],
    visible: false,
  }
  onChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }

  search = (value) => {
    // this.setState({
    //   loading: true
    // })
    const { dispatch,state } = this.props
    // state==="event"?dispatch({
    //     type: 'back/getChildEvent',
    //     payload:value,
    //     callback: (response) => {
    //     console.log(response)
    //     }
    //   }):dispatch({
    //   type: 'back/getPeople',
    //   payload:value,
    //   callback: (response) => {
    //     console.log(response)
    //   }
    // })
    // dispatch({
    //   type: 'knowledge/getKeyword',
    //   payload:value,
    //   callback: (response) => {
    //    // console.log(response)
    //   }
    // })
    // dispatch({
    //   type: 'knowledge/getAttribute',
    //   payload:value,
    //   callback: (response) => {
    //     console.log(response)
    //   }
    // })
    // this.setState({
    //   loading:false,
    //   searchValue:''
    // })
  }
  render(){
    const { state,allEvent } = this.props
    return (
      <div className={styles.search}>
       <Input size={"large"}
           className={styles.input}
           placeholder= {state==='event'?"请输入事件实体：":"请输入人物实体："}
           allowClear
           onChange={this.onChange} />
        <Button type="primary" className={styles.button} size={"large"} onClick={this.search(this.state.searchValue)}>开始检索</Button>
        {
          state==="event"?<Row>
            <Col span={4} className={styles.timeLine}>
              <Timeline className={styles.time} mode={"left"}>
                {
                  allEvent.map((item,index) => {
                    return (
                      <Timeline.Item key={index} dot={<SearchOutlined style={{ fontSize: '20px' }} />}>
                        <p className={styles.detail}  onClick={() =>this.search(item.title)}>
                          {item.title}<br/>{item.time.substr(1)}</p>
                      </Timeline.Item>
                    )
                  })
                }
              </Timeline>
            </Col>
            <Col span={20}>
              <Spin spinning={this.state.loading}>
                {
                  this.state.substance.length > 0 ? this.onSubstance() : Emptying
                }
              </Spin>
            </Col>
          </Row>:<Spin spinning={this.state.loading}>
            {
              this.state.substance.length > 0 ? this.onSubstance() : Emptying
            }
          </Spin>
        }
      </div>
    );
  }
}

export default search;
