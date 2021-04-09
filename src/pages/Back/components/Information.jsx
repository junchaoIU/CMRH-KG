import styles from '../index.less';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Timeline, Tabs, Tooltip } from 'antd';
import {
  ClockCircleTwoTone,
  TagsOutlined,
  EnvironmentTwoTone,
  CloudTwoTone,
} from '@ant-design/icons';
import Information from '@/pages/Common/Information';
import LineDrawer from '@/pages/Common/LineDrawer';

@connect(({ knowledge, loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))
class information extends PureComponent {
  state = {
    cardVisible: false,
    substance: [],
    loading: true,
  };

  onDispatch = (backWord) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledge/getSubstance',
      payload: backWord,
      callback: (response) => {
        if (response !== null) {
          this.setState({
            substance: response,
            loading: false,
          });
        }
      },
    });
  };

  onBack = (search) => {
    this.setState({
      substance: [],
      loading: true,
    });
    this.onDispatch(search);
    this.setState({
      cardVisible: true,
    });
  };

  onCloseBack = () => {
    this.setState({
      cardVisible: false,
    });
  };

  timeLine = () => {
    const { cardVisible, loading, substance } = this.state;
    const {
      childEvent: { series },
    } = this.props;

    return (
      <Timeline className={styles.time} mode={'left'}>
        {series.map((item, index) => {
          return (
            <Timeline.Item key={index} dot={<TagsOutlined style={{ fontSize: '18px' }} />}>
              <p className={styles.text}>
                <ClockCircleTwoTone twoToneColor="#52c41a" className={styles.icon} />
                {item[0][0]}
              </p>
              <p className={styles.text}>
                <EnvironmentTwoTone twoToneColor="#eb2f96" className={styles.icon} />
                {item[0][1]}
              </p>
              <Tooltip
                color={'#2db7f5'}
                placement="topLeft"
                title="点击事件语料回溯"
                arrowPointAtCenter
              >
                <p
                  className={styles.detail}
                  onClick={() => this.onBack(`${item[0][0]}${item[0][1]}${item[0][4]}`)}
                >
                  <CloudTwoTone twoToneColor="#87e8de" className={styles.icon} />
                  {item[0][4]}
                </p>
              </Tooltip>
            </Timeline.Item>
          );
        })}
        <LineDrawer
          onCloseBack={this.onCloseBack}
          cardVisible={cardVisible}
          loading={loading}
          substance={substance}
          style={{ position: 'absolute', transform: 'none' }}
        />
      </Timeline>
    );
  };

  render() {
    const { propSearch, detailData, chartsData } = this.props;
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard}>
          <Tabs.TabPane tab="事件时间线" key="1">
            {this.timeLine()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="事件信息" key="2">
            <Information propSearch={propSearch} detailData={detailData} chartsData={chartsData} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default information;
