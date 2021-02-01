import React,{ PureComponent } from 'react';
import { Input,Card,Col,Row,Button,message } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import {
  SwapOutlined
} from '@ant-design/icons';
import Empty from '../../../components/Empty'

@connect(({ relation,loading }) => ({
  relation,
  submitting: loading.effects['relation/relation'],
}))

class search extends PureComponent {
  state = {
    val: false,
    object:'',
    subject:''
  }
  onChange=(e)=>{
    this.setState({
      object:e.target.value
    })
  }

  onChange1=(e)=> {
    this.setState({
      subject: e.target.value
    })
  }

  search=()=>{
    const data={
      object: this.state.object,
      subject: this.state.subject
    }
    const { dispatch } = this.props
    dispatch({
      type: 'relation/getPeople',
      payload: data,
      callback: (response) => {
        if(response !== null) {
          this.setState({
            val: true
          })
        }else if(response === ''){
          message.warning("未找到两者之间的关系！");
        }
      }
    })
  }
  render(){
    return (
      <div>
        <div className={styles.search}>
          <Input.Group compact >
            <Input className={styles.input} size={"large"}  placeholder="知识点一：" allowClear onChange={this.onChange} />
            <SwapOutlined className={styles.icon}/>
            <Input className={styles.input} size={"large"}  placeholder="知识点二：" allowClear onChange={this.onChange1} />
            <Button type="primary" className={styles.button}  size={"large"} onClick={this.search}>检索一下</Button>
          </Input.Group>
        </div>
      </div>
    );
  }
}

export default search;
