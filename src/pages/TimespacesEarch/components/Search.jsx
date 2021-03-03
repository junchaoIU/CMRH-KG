import React, { PureComponent } from 'react';
import { Select, Input, message, Spin, Button } from 'antd';
import styles from '../index.less';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import Information from './Information';

@connect(({ timeSpaces, loading }) => ({
  timeSpaces,
  loading1: loading.effects['timeSpaces/getTimeRecallDetail'],
  loading2: loading.effects['timeSpaces/getPeriodTimeRecallDetail'],
  loading3: loading.effects['timeSpaces/getSpaceRecallDetail'],
  loading4: loading.effects['timeSpaces/getTimeSpaceRecallDetail'],
  // submitting: loading.effects['timeSpaces/timeSpaces'],
}))
class search extends PureComponent {
  state = {
    val: false,
    value1: '',
    value2: '',
    mode: 'time',
    loading: false,
    information: [],
    relation: [],
    page: {
      minValue: 0,
      maxValue: 8,
      current: 1,
    },
  };

  componentDidMount() {
    const { parentValue1, parentValue2, mode } = this.props;
    if (parentValue1 !== '' || parentValue2 !== '') {
      this.setState({
        value1: parentValue1,
        value2: parentValue2,
        mode,
      });
      switch (mode) {
        case 'time':
          this.fetchData(parentValue1, null, mode);
          break;
        case 'times':
          this.fetchData(parentValue1, parentValue2, mode);
          break;
        case 'space':
          this.fetchData(parentValue1, null, mode);
          break;
        default:
          this.fetchData(parentValue1, parentValue2, mode);
      }
    }
  }

  handleModeChange = (value) => {
    this.setState({
      mode: value,
      value1: '',
      value2: '',
    });
  };

  valueChange1 = (e) => {
    this.setState({
      value1: e.target.value,
    });
  };

  valueChange2 = (e) => {
    this.setState({
      value2: e.target.value,
    });
  };

  fetchData = (value1, value2, mode) => {
    this.setState({
      loading: true,
    });
    const moding = mode !== null ? mode : this.state.mode;
    const { dispatch } = this.props;
    this.setState({
      page: {
        minValue: 0,
        maxValue: 8,
        current: 1,
      },
      loading: true,
    });
    switch (moding) {
      case 'time':
        dispatch({
          type: 'timeSpaces/getTimeRecallDetail',
          payload: value1 !== null ? value1 : this.state.value1,
          callback: (response) => {
            if (response !== null)
              this.setState({
                information: response,
              });
            if (response.length === 0) {
              message.warning('找不到您检索的时间点！');
            }
          },
        });
        dispatch({
          type: 'timeSpaces/getTimeDetail',
          payload: value1 !== null ? value1 : this.state.value1,
          callback: (response) => {
            if (response !== null)
              this.setState({
                relation: response,
              });
          },
        });
        break;
      case 'times':
        const data = {
          time1:
            value1 !== null
              ? parseInt(value1.replace(/年/, '0000'))
              : parseInt(this.state.value1.replace(/年/, '0000')),
          time2:
            value2 !== null
              ? parseInt(value2.replace(/年/, '0000'))
              : parseInt(this.state.value2.replace(/年/, '0000')),
        };
        dispatch({
          type: 'timeSpaces/getPeriodTimeRecallDetail',
          payload: data,
          callback: (response) => {
            if (response !== null)
              this.setState({
                information: response,
              });
            if (response.length === 0) {
              message.warning('找不到您检索的时间段！');
            }
          },
        });
        dispatch({
          type: 'timeSpaces/getPeriodTime',
          payload: data,
          callback: (response) => {
            if (response !== null)
              this.setState({
                relation: response,
              });
          },
        });
        break;
      case 'space':
        dispatch({
          type: 'timeSpaces/getSpaceRecallDetail',
          payload: value1 !== null ? value1 : this.state.value1,
          callback: (response) => {
            if (response !== null)
              this.setState({
                information: response,
              });
            if (response.length === 0) {
              message.warning('找不到您检索的地点！');
            }
          },
        });
        dispatch({
          type: 'timeSpaces/getSpace',
          payload: value1 !== null ? value1 : this.state.value1,
          callback: (response) => {
            if (response !== null)
              this.setState({
                relation: response,
              });
          },
        });
        break;
      default:
        const data1 = {
          time: value1 !== null ? value1 : this.state.value1,
          space: value2 !== null ? value2 : this.state.value2,
        };
        dispatch({
          type: 'timeSpaces/getTimeSpaceRecallDetail',
          payload: data1,
          callback: (response) => {
            if (response !== null)
              this.setState({
                information: response,
              });
            if (response.length === 0) {
              message.warning('找不到您检索的时空！');
            }
          },
        });
        dispatch({
          type: 'timeSpaces/getTimeSpace',
          payload: data1,
          callback: (response) => {
            if (response !== null)
              this.setState({
                relation: response,
              });
          },
        });
    }
  };

  handleChangePage = (value) => {
    if (value <= 1) {
      this.setState({
        page: { minValue: 0, maxValue: 8, current: 1 },
      });
    } else {
      this.setState({
        page: { minValue: (value - 1) * 8, maxValue: (value - 1) * 8 + 8, current: value },
      });
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  render() {
    const { mode, information, relation, page } = this.state;
    const { loading1, loading2, loading3, loading4 } = this.props;
    const loadings2 = loading2 === undefined ? false : loading2;
    const loadings3 = loading3 === undefined ? false : loading3;
    const loadings4 = loading4 === undefined ? false : loading4;
    const loading =
      mode === 'time'
        ? loading1
        : mode === 'times'
        ? loadings2
        : mode === 'space'
        ? loadings3
        : loadings4;
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
            {mode === 'time' ? (
              <div>
                <Input
                  onChange={this.valueChange1}
                  size={'large'}
                  style={{ width: 400 }}
                  value={this.state.value1}
                  placeholder="请检索需要查询的时空实体,例如：1911年4月"
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size={'large'}
                  onClick={() => this.fetchData(null, null, null)}
                >
                  时空检索
                </Button>
              </div>
            ) : mode === 'times' ? (
              <div>
                <Input
                  onChange={this.valueChange1}
                  value={this.state.value1}
                  size={'large'}
                  style={{ width: 150 }}
                  placeholder="例如：1940年"
                />
                &nbsp;&nbsp;~&nbsp;&nbsp;
                <Input
                  onChange={this.valueChange2}
                  value={this.state.value2}
                  size={'large'}
                  style={{ width: 150 }}
                  placeholder="例如：1941年"
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size={'large'}
                  onClick={() => this.fetchData(null, null, null)}
                >
                  时空检索
                </Button>
              </div>
            ) : mode === 'space' ? (
              <div>
                <Input
                  onChange={this.valueChange1}
                  size={'large'}
                  value={this.state.value1}
                  style={{ width: 400 }}
                  placeholder="请检索需要查询的时空实体,例如：广州"
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size={'large'}
                  onClick={() => this.fetchData(null, null, null)}
                >
                  时空检索
                </Button>
              </div>
            ) : (
              <div>
                <Input
                  onChange={this.valueChange1}
                  size={'large'}
                  value={this.state.value1}
                  style={{ width: 220, marginRight: '5px' }}
                  placeholder="时间点：(例如：1911年4月)"
                />
                <Input
                  onChange={this.valueChange2}
                  value={this.state.value2}
                  size={'large'}
                  style={{ width: 220 }}
                  placeholder="地点：(例如：广州)"
                />
                <Button
                  type="primary"
                  size={'large'}
                  icon={<SearchOutlined />}
                  onClick={() => this.fetchData(null, null, null)}
                >
                  时空检索
                </Button>
              </div>
            )}
          </div>
        </div>
        <Spin spinning={loading}>
          <Information
            detail={information}
            relation={relation}
            mode={mode}
            handleChangePage={this.handleChangePage}
            page={page}
          />
        </Spin>
      </div>
    );
  }
}

export default search;
