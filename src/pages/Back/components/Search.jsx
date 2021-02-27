import React, { PureComponent } from 'react';
import { Input, Tooltip, Spin, Empty, Button, message, Timeline, Col, Row } from 'antd';
import styles from '../index.less';
import Information from '../components/Information';
import { connect } from 'dva';
import { SearchOutlined } from '@ant-design/icons';

const Emptying = (
  <Empty
    style={{ height: '500px' }}
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 100,
      margin: '15% 0 0',
    }}
    description={<span>暂无数据</span>}
  ></Empty>
);

@connect(({ knowledge, loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))
@connect(({ back, loading }) => ({
  back,
  submitting: loading.effects['back/back'],
}))
class search extends PureComponent {
  state = {
    searchValue: '',
    loading: false,
  };
  onChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };
  handleSearch = (value) => {
    const { dispatch, state } = this.props;
    state === 'event'
      ? dispatch({
          type: 'back/getChildEvent',
          payload: value,
        })
      : dispatch({
          type: 'back/getPeople',
          payload: value,
          callback: (response) => {},
        });
    dispatch({
      type: 'knowledge/getKeyword',
      payload: value,
    });
    dispatch({
      type: 'knowledge/getAttribute',
      payload: value,
      callback: (response) => {},
    });
  };
  onInformation = (childEvent) => {
    return (
      <Spin spinning={this.state.loading}>
        {Object.keys(childEvent).length !== 0 ? (
          <Row>
            <Col span={15}>在开发</Col>
            <Col span={9}>
              <Information childEvent={childEvent} />
            </Col>
          </Row>
        ) : (
          Emptying
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
          onChange={this.onChange}
        />
        <Button
          type="primary"
          className={styles.button}
          size={'large'}
          onClick={() => this.handleSearch(this.state.searchValue)}
        >
          开始检索呀
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
