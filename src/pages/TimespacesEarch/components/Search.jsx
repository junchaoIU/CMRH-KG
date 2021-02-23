import React,{ PureComponent } from 'react';
import { Select,Input,Col,Row,Button } from 'antd';
import styles from '../index.less';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import Information from './Information'

@connect(({ timeSpaces,loading }) => ({
  timeSpaces,
  submitting: loading.effects['timeSpaces/timespaces'],
}))
class search extends PureComponent {
  state = {
    val: false,
    value1: '',
    value2: '',
    mode: 'time',
    information: [],
    relation: [],
    page:{
      minValue: 0,
      maxValue: 8,
      current:1
    }
  }
  handleModeChange = (value) => {
    this.setState({
      mode: value,
      value1:'',
      value2:''
    });
  }
  valueChange1 = e => {
    this.setState({
      value1: e.target.value
    })
  }

  fetchData1 = () => {
    const { dispatch } = this.props
    this.setState({
      page:{
        minValue:0,
        maxValue:8,
        current: 1
      }
    })
    dispatch({
      type: 'timeSpaces/getTimeRecallDetail',
      payload: this.state.value1,
      callback: (response) => {
        if(response !== null)
          this.setState({
            information: response
          })
      }
    })
    dispatch({
      type: 'timeSpaces/getTimeDetail',
      payload: this.state.value1,
      callback: (response) => {
        if(response !== null)
          this.setState({
            relation: response
          })
      }
    })
  }

  valueChange2 = e => {
    this.setState({
      value1: e.target.value
    })
  }
  valueChange3 = e => {
    this.setState({
      value2: e.target.value
    })
  }

  fetchData2 = () => {
    const { dispatch } = this.props
    this.setState({
      page:{
        minValue:0,
        maxValue:8,
        current: 1
      }
    })
    const data = {
      time1: parseInt(this.state.value1.replace(/年/,'0000')),
      time2: parseInt(this.state.value2.replace(/年/,'0000'))
    }
    dispatch({
      type: 'timeSpaces/getPeriodTimeRecallDetail',
      payload: data,
      callback: (response) => {
        if(response !== null)
          this.setState({
            information: response
          })
      }
    })
    dispatch({
      type: 'timeSpaces/getPeriodTime',
      payload: data,
      callback: (response) => {
        if(response !== null)
          this.setState({
            relation: response
          })
      }
    })
  }

  valueChange4 = e => {
    this.setState({
      value1: e.target.value
    })
  }

  fetchData4 = () => {
    const { dispatch } = this.props
    this.setState({
      page:{
        minValue:0,
        maxValue:8,
        current: 1
      }
    })
    dispatch({
      type: 'timeSpaces/getSpaceRecallDetail',
      payload: this.state.value1,
      callback: (response) => {
        if(response !== null)
          this.setState({
            information: response
          })
      }
    })
    dispatch({
      type: 'timeSpaces/getSpace',
      payload: this.state.value1,
      callback: (response) => {
        if(response !== null)
          this.setState({
            relation: response
          })
      }
    })
  }
  valueChange5 = e => {
    this.setState({
      value1: e.target.value
    })
  }
  valueChange6 = e => {
    this.setState({
      value2: e.target.value
    })
  }
  fetchData5 = () => {
    const { dispatch } = this.props
    this.setState({
      page:{
        minValue:0,
        maxValue:8,
        current: 1
      }
    })
    const data = {
      time: this.state.value1,
      space: this.state.value2
    }
    dispatch({
      type: 'timeSpaces/getTimeSpaceRecallDetail',
      payload: data,
      callback: (response) => {
        if(response !== null)
          this.setState({
            information: response
          })
      }
    })
    dispatch({
      type: 'timeSpaces/getTimeSpace',
      payload: data,
      callback: (response) => {
        if(response !== null)
          this.setState({
            relation: response
          })
      }
    })
  }
   handleChangePage = value => {
    if (value <= 1) {
      this.setState({
        page:{minValue: 0,
        maxValue: 8,current:1}
      });
    } else {
      this.setState({
        page:{minValue: (value-1) * 8,
        maxValue: (value-1) * 8+ 8,
        current:value
        },
      });
    }
     document.body.scrollTop = document.documentElement.scrollTop = 0;
  };
  render(){
    const { mode,information,relation,page } = this.state
    return (
      <div className={styles.outside}>
        <div className={styles.search}>
          <div className={styles.content}>
            <Select size={'large'} value={mode} onChange={this.handleModeChange}>
              <Select.Option value="time">时间点</Select.Option>
              <Select.Option value="times">时间段</Select.Option>
              <Select.Option value="space">地点</Select.Option>
              <Select.Option value="timespace">时空</Select.Option>
            </Select>
            {mode === "time" ?
              <div>
                <Input onChange={this.valueChange1}
                       size={"large"}
                       style={{ width: 400 }}
                       value={this.state.value1}
                       placeholder="请检索需要查询的时空实体,例如：1911年4月" />
                <Button type="primary"
                        icon={<SearchOutlined />}
                        size={"large"}
                        onClick={this.fetchData1}>
                  时空检索
                </Button>
              </div> : mode === "times" ? <div>
                <Input onChange={this.valueChange2} value={this.state.value1} size={"large"} style={{ width: 150 }} placeholder="例如：1940年" />
                &nbsp;&nbsp;~&nbsp;&nbsp;
                <Input onChange={this.valueChange3} value={this.state.value2} size={"large"} style={{ width: 150 }} placeholder="例如：1941年" />
                <Button type="primary"
                        icon={<SearchOutlined />}
                        size={"large"}
                        onClick={this.fetchData2}>
                  时空检索
                </Button>
              </div> : mode === "space" ?
                <div>
                  <Input onChange={this.valueChange4}
                         size={"large"}
                         value={this.state.value1}
                         style={{ width: 400 }}
                         placeholder="请检索需要查询的时空实体,例如：广州" />
                  <Button type="primary"
                          icon={<SearchOutlined />}
                          size={"large"}
                          onClick={this.fetchData4}>
                    时空检索
                  </Button>
                </div> : <div>
                  <Input onChange={this.valueChange5}
                         size={"large"}
                         value={this.state.value1}
                         style={{ width: 220,marginRight: '5px' }}
                         placeholder="时间点：(例如：1911年4月)" />
                  <Input onChange={this.valueChange6} value={this.state.value2} size={"large"} style={{ width: 220 }} placeholder="地点：(例如：广州)" />
                  <Button type="primary"
                          size={"large"}
                          icon={<SearchOutlined />}
                          onClick={this.fetchData5}>
                    时空检索
                  </Button>
                </div>}
          </div>
        </div>
        <Information detail={information} relation={relation} mode={mode}
                     handleChangePage={this.handleChangePage}
                     page={page}
                    />
      </div>
    );
  }
}

export default search;
