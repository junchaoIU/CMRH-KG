import styles from '../index.less';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Timeline, Tabs, Tooltip, Col, Pagination, Row } from 'antd';
import {
  ClockCircleTwoTone,
  CrownOutlined,
  PushpinTwoTone,
  TagsOutlined,
  EnvironmentTwoTone,
  CloudTwoTone,
} from '@ant-design/icons';
import Emptys from '../../../components/Empty/index';
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

  // 实体信息
  onInformation = () => {
    const { detail, page, handleChangePage } = this.props;
    return (
      <Timeline className={styles.time} mode={'left'}>
        {detail.slice(page.minValue, page.maxValue).map((item, index) => {
          return (
            <Timeline.Item key={index} dot={<TagsOutlined style={{ fontSize: '20px' }} />}>
              <p>
                <PushpinTwoTone twoToneColor="#eb2f96" className={styles.icon} />
                {item[0]}
              </p>
              <p>
                <ClockCircleTwoTone twoToneColor="#52c41a" className={styles.icon} />
                {item[1] === '未知' ? item[1] : item[1].substr(1)}
              </p>
              <p>
                <EnvironmentTwoTone twoToneColor="#adc6ff" className={styles.icon} />
                {item[2]}
              </p>
              <Tooltip
                color={'#2db7f5'}
                placement="topLeft"
                title="点击事件语料关联"
                arrowPointAtCenter
              >
                <p className={styles.detail} onClick={() => this.onBack(item[3])}>
                  <CloudTwoTone twoToneColor="#87e8de" className={styles.icon} />
                  {item[3]}
                </p>
              </Tooltip>
            </Timeline.Item>
          );
        })}
        <Pagination
          style={{ float: 'right', marginBottom: '10px' }}
          defaultPageSize={8}
          showSizeChanger={false}
          current={page.current}
          onChange={handleChangePage}
          total={detail.length}
        />
      </Timeline>
    );
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
  onRelation = () => {
    const { relation, mode } = this.props;
    const entity = [];
    const categorys = ['开始时间', '结束时间', '出生日期', '逝世日期', '签订时间'];
    const spaceCategorys = ['事件地点', '地理位置', '出生地点', '签订地点'];
    const timespaceCategorys = [
      '开始时间',
      '结束时间',
      '出生日期',
      '逝世日期',
      '签订时间',
      '事件地点',
      '地理位置',
      '出生地点',
      '签订地点',
    ];

    mode === 'space'
      ? relation.links !== null
        ? relation.links.map((item) => {
            if (spaceCategorys.includes(item.category)) {
              entity.push(item);
            }
          })
        : ''
      : mode === 'timespace'
      ? relation.links !== null
        ? relation.links.map((item) => {
            if (timespaceCategorys.includes(item.category)) {
              entity.push(item);
            }
          })
        : ''
      : relation.links !== null
      ? relation.links.map((item) => {
          if (categorys.includes(item.category)) {
            entity.push(item);
          }
        })
      : '';
    return (
      <Timeline className={styles.time} mode={'right'}>
        {entity.map((item, index) => {
          const label =
            item.target.substring(0, 1) === 'y'
              ? `${item.category}：${item.target.substr(1)}`
              : `${item.category}：${item.target}`;
          return (
            <Timeline.Item
              label={label}
              key={index}
              dot={<CrownOutlined style={{ fontSize: '18px' }} />}
            >
              {item.source}
            </Timeline.Item>
          );
        })}
      </Timeline>
    );
  };

  render() {
    const { detail, relation } = this.props;
    const { loading, substance, cardVisible } = this.state;
    return (
      <div className={styles.cardContainer}>
        {detail.length > 0 && relation.length !== 0 ? (
          <Row>
            <Col span={16}>
              <Tabs type="card" className={styles.outCard} centered>
                <Tabs.TabPane tab="回溯时空信息" key="1" className={styles.innerCard}>
                  {this.onInformation()}
                  <LineDrawer
                    onCloseBack={this.onCloseBack}
                    cardVisible={cardVisible}
                    loading={loading}
                    substance={substance}
                    width={'35%'}
                  />
                </Tabs.TabPane>
              </Tabs>
            </Col>
            <Col span={8}>
              <Tabs type="card" className={styles.outCard} centered>
                <Tabs.TabPane tab="相关实体" key="1" className={styles.innerCard}>
                  {this.onRelation()}
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        ) : (
          <Emptys />
        )}
      </div>
    );
  }
}

export default information;
