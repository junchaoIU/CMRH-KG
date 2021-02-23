import React,{ PureComponent } from 'react';
import { Input,Card,Spin,Empty,Button,message,Select,Col,Row } from 'antd';
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
   onChange(value) {
    console.log(`selected ${value}`);
  }

   onBlur() {
    console.log('blur');
  }

   onFocus() {
    console.log('focus');
  }

   onSearch(val) {
    console.log('search:', val);
  }

  render(){
    const { state,allEvent } = this.props
    console.log(allEvent)
    return (
      <div className={styles.search}>
        {
          state === "event" ? <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input,option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="tom">Tom</Select.Option>
          </Select> : <Input size={"large"}
                             className={styles.input}
                             placeholder={state === "event" ? "请输入事件实体：" : "请输入人物实体："}
                             allowClear
                             onChange={this.onChange} />
        }
        <Button type="primary" className={styles.button} size={"large"} onClick={this.search}>开始检索</Button>
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
