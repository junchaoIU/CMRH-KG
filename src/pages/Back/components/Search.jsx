import React, { PureComponent } from 'react';
import { Input, Spin, Button, Timeline, Col, Row, message } from 'antd';
import styles from '../index.less';
import Information from '../components/Information';
import { connect } from 'dva';
import Empty from '../../../components/Empty/index';
import { SearchOutlined } from '@ant-design/icons';
import MapCharts from './MapCharts';
@connect(({ knowledge, loading }) => ({
  knowledge,
  loading: loading.effects['knowledge/getKeyword'],
}))
@connect(({ back, loading }) => ({
  back,
  submitting: loading.effects['back/back'],
}))
class search extends PureComponent {
  state = {
    searchValue: '',
    detailData: [],
    chartsData: [],
    propSearch: [],
  };

  componentDidMount() {
    const { parentSearch } = this.props;
    if (parentSearch !== '') {
      this.setState({
        searchValue: parentSearch,
      });
      this.handleSearch(parentSearch);
    }
  }

  onChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleSearch = (value) => {
    const { dispatch, state } = this.props;
    // eslint-disable-next-line no-unused-expressions
    state === 'event'
      ? dispatch({
          type: 'back/getChildEvent',
          payload: value,
        })
      : dispatch({
          type: 'back/getPeople',
          payload: value,
        });
    dispatch({
      type: 'knowledge/getKeyword',
      payload: value,
      callback: (response) => {
        if (response !== null) {
          console.log(response.length);
          this.setState({
            chartsData: response,
            propSearch: value,
          });
        }
        if (response.length === 0) {
          message.warning('找不到您检索的实体！');
        }
      },
    });
    dispatch({
      type: 'knowledge/getAttribute',
      payload: value,
      callback: (response) => {
        if (response !== null) {
          this.setState({
            detailData: response,
          });
        }
      },
    });
  };

  onInformation = (childEvent) => {
    const { loading } = this.props;
    const loadings = loading === undefined ? false : loading;
    return (
      <Spin spinning={loadings}>
        {Object.keys(childEvent).length !== 0 &&
        this.state.chartsData.length !== 0 &&
        this.state.detailData.length !== 0 ? (
          <Row>
            <Col span={15}>
              <MapCharts />
            </Col>
            <Col span={9}>
              <Information
                childEvent={childEvent}
                chartsData={this.state.chartsData}
                detailData={this.state.detailData}
                propSearch={this.state.propSearch}
              />
            </Col>
          </Row>
        ) : (
          <Empty />
        )}
      </Spin>
    );
  };

  render() {
    const {
      state,
      allEvent,
      back: { childEvent, people },
    } = this.props;
    return (
      <div className={styles.search}>
        <Input
          size={'large'}
          className={styles.input}
          placeholder={state === 'event' ? '请输入事件实体：' : '请输入人物实体：'}
          allowClear
          value={this.state.searchValue}
          onChange={this.onChange}
        />
        <Button
          type="primary"
          className={styles.button}
          size={'large'}
          onClick={() => this.handleSearch(this.state.searchValue)}
        >
          开始检索
        </Button>
        {state === 'event' ? (
          <Row>
            <Col span={4} className={styles.timeLine}>
              <Timeline className={styles.time} mode={'left'}>
                {allEvent.map((item, index) => {
                  return (
                    <Timeline.Item
                      key={index}
                      dot={<SearchOutlined style={{ fontSize: '20px' }} />}
                    >
                      <p className={styles.detail} onClick={() => this.handleSearch(item.title)}>
                        {item.title}
                        <br />
                        {item.time.substr(1)}
                      </p>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            </Col>
            <Col span={20}>{this.onInformation(childEvent)}</Col>
          </Row>
        ) : (
          this.onInformation(people)
        )}
      </div>
    );
  }
}

export default search;
