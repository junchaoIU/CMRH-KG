import React,{ PureComponent } from 'react';
import { Cascader,Row,Col,Button } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import catalogData from './catalog'
import Charts from './Charts'
import Empty from './Empty'
@connect(({ knowledge,loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))

class search extends PureComponent {
  state = {
    inpValue: [],
    searchValue: [],
    chartsData: [],
    val: false,
    propSearch: []
  }

  onChange = (value) => {
    this.setState({
      searchValue: value
    })
    this.setState({
      chartsData: [],
      val: false
    })
    this.handleSearch(value)
  };
  search = () => {
    const arr = []
    arr[0] = this.state.inpValue
    this.setState({
      searchValue: arr
    })
    this.setState({
      chartsData: [],
      val: false
    })
    this.handleSearch(arr)
  }

  handleSearch = (value) => {
    const data = value.slice(-1)
    const { dispatch } = this.props
    dispatch({
      type: 'knowledge/getKeyword',
      payload: data,
      callback: (response) => {
        console.log(response)
        if(response !== null) {
          this.setState({
            chartsData: response,
            propSearch: data,
            val: true
          })
        }
      }
    })
    dispatch({
      type: 'knowledge/getAttribute',
      payload: data,
      callback: (response) => {
      }
    })
  }
  filter = (inputValue,path) => {
    this.setState({
      inpValue: inputValue
    })
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  displayRender(label){
    return label[label.length - 1];
  };

  clear = () => {
    this.setState({
      searchValue: []
    })
    return true;
  }

  render(){
    console.log(this.state.chartsData.length)
    return (
      <div>
        <div className={styles.search}>
          <Cascader
            allowClear={this.clear}
            className={styles.cascader}
            options={catalogData}
            onChange={this.onChange}
            placeholder="请选择或输入检索的知识点"
            displayRender={this.displayRender}
            size="large"
            showSearch={{ filter: this.filter,matchInputWidth: false }}
            value={this.state.searchValue}
          />
          <Button type="primary" size={"large"} onClick={this.search}>检索一下</Button>
          <Row className={styles.content}>
            <Col span={14}>
              {(this.state.val && this.state.chartsData.length !== 0) ?
                <Charts chartsData={this.state.chartsData} propSearch={this.state.propSearch} /> :<Empty/>
              }
            </Col>
            <Col span={10}>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default search;