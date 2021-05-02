import React, { PureComponent } from 'react';
import { message, Spin } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import Information from './Information';
import SearchInput from './SearchInput';

@connect(({ timeSpaces, loading }) => ({
  timeSpaces,
  loading1: loading.effects['timeSpaces/getTimeRecallDetail'],
  loading2: loading.effects['timeSpaces/getPeriodTimeRecallDetail'],
  loading3: loading.effects['timeSpaces/getSpaceRecallDetail'],
  loading4: loading.effects['timeSpaces/getTimeSpaceRecallDetail'],
}))
class searchResult extends PureComponent {
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
    const { mode, information, relation, page, value1, value2 } = this.state;
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
        <SearchInput
          mode={mode}
          value1={value1}
          value2={value2}
          handleModeChange={this.handleModeChange}
          valueChange1={this.valueChange1}
          valueChange2={this.valueChange2}
          search={() => this.fetchData(null, null, null)}
        />
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

export default searchResult;
