import React,{ PureComponent } from 'react';
import { Input,Card,Spin,Empty,Button,message,Drawer,Col,Row } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';

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

  search = () => {
    this.setState({
      loading: true
    })

    const { dispatch } = this.props
    dispatch({
      type: 'knowledge/getSubstance',
      payload: this.state.searchValue,
      callback: (response) => {
        if(response.length === 0) {
          this.setState({
            loading: false
          })
          message.warning("未检索到其语料回溯！");
        }
        if(response !== null) {
          this.setState({
            substance: response,
            loading: false
          })
        }
      }
    })
  }

  onSubstance = () => {
    const tip = this.state.substance.length > 0 ? this.state.substance[0].num : ''
    return (
      <div className={styles.substanceDiv}>
        <Card size="small" title={tip}>
          <Row justify="center">
            {
              this.state.substance.map((item,index) => {
                return (
                  <Col span={12} key={index}>
                    <Card hoverable>
                      <div className={styles.bookImage}>
                        <img
                          style={{ height: '100px' }}
                          src={`http://39.101.193.14:2222//book/${item.fileName}.png`}
                        />
                      </div>
                      <p>{item.fileName}</p>
                      <p>简介</p>
                      <Button type={"primary"} value={index} onClick={this.showDrawer}>查看详情</Button>
                      <Drawer
                        title={this.state.drawer.fileName}
                        placement="left"
                        closable={false}
                        width={'50%'}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        style={{ animationTimingFunction: 'ease-out' }}
                        maskStyle={{ opacity: '0.1',animation: '1s infinite',boxShadow: 'none' }}
                      >
                        <p style={{ letterSpacing: '1px' }}
                           dangerouslySetInnerHTML={{ __html: this.state.drawer.content }} />
                      </Drawer>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </Card>
      </div>
    )
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

  render(){
    return (
      <div className={styles.search}>
        <Input size={"large"}
               className={styles.input}
               placeholder="请输入实体知识 / 三元组(关系) / 问题驱动："
               allowClear
               onChange={this.onChange} />
        <Button type="primary" className={styles.button} size={"large"} onClick={this.search}>语料回溯</Button>
        <Spin spinning={this.state.loading}>
          {
            this.state.substance.length > 0 ? this.onSubstance() : Emptying
          }
        </Spin>
      </div>
    );
  }
}

export default search;
