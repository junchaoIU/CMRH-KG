import React,{ PureComponent } from 'react';
import { Input,Spin,Col,Row,Button,message } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import {
  SwapOutlined
} from '@ant-design/icons';
import Empty from '../../../components/Empty/index'
import Charts from "./Charts";
import Information from './Information'

@connect(({ relation,loading }) => ({
  relation,
  submitting: loading.effects['relation/relation'],
}))
@connect(({ knowledge,loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))
class search extends PureComponent {
  state = {
    val: false,
    object: '',
    subject: '',
    objectLinks: [],
    subjectLinks: [],
    substance:[]
  }
  onChange = (e) => {
    this.setState({
      object: e.target.value
    })
  }

  onChange1 = (e) => {
    this.setState({
      subject: e.target.value
    })
  }

  search = () => {
    this.setState({
      objectLinks:[],
      subjectLinks:[],
      val:false,
      substance:[]
    })
    const data = {
      object: this.state.object,
      subject: this.state.subject
    }
    const { dispatch } = this.props
    dispatch({
      type: 'relation/getPeople',
      payload: data,
      callback: (response) => {
        if(response[0].object === null) {
          message.warning("未找到两者之间的关系！");
        }
        if(response.length === 2) {
          this.setState({
            val: true
          })
        }
      }
    })
    dispatch({
      type: 'knowledge/getKeyword',
      payload: this.state.object,
      callback: (response) => {
        this.setState({
          objectLinks: response
        })
      }
    })
    dispatch({
      type: 'knowledge/getKeyword',
      payload: this.state.subject,
      callback: (response) => {
        this.setState({
          subjectLinks: response
        })
      }
    })
    dispatch({
      type: 'knowledge/getSubstance',
      payload: `${this.state.object}${this.state.subject}`,
      callback: (response) => {
        if(response !== null) {
          this.setState({
            substance: response
          })
        }
      }
    })
  }
  render(){
    const {objectLinks,subjectLinks,val,object,subject}=this.state
    return (
      <div className={styles.search}>
        <Input.Group compact>
          <Input className={styles.input} size={"large"} placeholder="知识点一：" allowClear onChange={this.onChange} />
          <SwapOutlined className={styles.icon} />
          <Input className={styles.input} size={"large"} placeholder="知识点二：" allowClear onChange={this.onChange1} />
          <Button type="primary" className={styles.button} size={"large"} onClick={this.search}>检索一下</Button>
        </Input.Group>
        {val && objectLinks.length!==0 && subjectLinks.length!==0?
          <Row className={styles.content}>
            <Col span={14}>
              <Charts objectLinks={objectLinks} subjectLinks={subjectLinks}
                      propSearch={`${object}和${subject}`}/>
            </Col>
            <Col span={10}>
              <Information propSearch={`${object}${subject}`} substance={this.state.substance}/>
            </Col>
          </Row>: <Empty />
        }
      </div>
    );
  }
}

export default search;
