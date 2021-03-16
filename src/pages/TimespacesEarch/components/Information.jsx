import styles from '../index.less';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Timeline,
  Tabs,
  Tooltip,
  BackTop,
  Col,
  Pagination,
  Row,
  Empty,
  Card,
  Button,
  Spin,
  Drawer,
} from 'antd';
import {
  ClockCircleTwoTone,
  CrownOutlined,
  PushpinTwoTone,
  TagsOutlined,
  EnvironmentTwoTone,
  CloudTwoTone,
} from '@ant-design/icons';
import Emptys from '../../../components/Empty/index';
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
class information extends PureComponent {
  state = {
    indeterminate: true,
    visible: false,
    cardVisible: false,
    substance: [],
    loading: true,
    drawer: [],
    rightHeight: '',
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

  showDrawer = (e) => {
    const drawerData = this.state.substance[e.currentTarget.value];
    this.setState({
      drawer: drawerData,
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
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
                title="点击事件语料回溯"
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

  // 实体语料回溯
  onSubstance = () => {
    const tip = this.state.substance.length > 0 ? this.state.substance[0].num : '';
    return (
      <Spin spinning={this.state.loading}>
        {this.state.substance.length > 0 ? (
          <div className={styles.substanceDiv}>
            <Card size="small" title={tip}>
              {this.state.substance.map((item, index) => {
                return (
                  <Card hoverable key={index} className={styles.card}>
                    <div className={styles.bookImage}>
                      <img
                        style={{ height: '100px' }}
                        src={`http://gzknowledge.cn:2222/book/${item.bookName}${item.bookAuthor}.png`}
                      />
                    </div>
                    <p>{item.bookName}</p>
                    <p>简介</p>
                    <Button type={'primary'} value={index} onClick={this.showDrawer}>
                      查看详情
                    </Button>
                  </Card>
                );
              })}
            </Card>
          </div>
        ) : (
          Emptying
        )}
      </Spin>
    );
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
    return (
      <div className={styles.cardContainer}>
        {detail.length > 0 && relation.length !== 0 ? (
          <Row>
            <Col span={16}>
              <Tabs type="card" className={styles.outCard} centered>
                <Tabs.TabPane tab="回溯时空信息" key="1" className={styles.innerCard}>
                  {this.onInformation()}
                  <Drawer
                    title="事件语料回溯"
                    placement="right"
                    closable={false}
                    width={'35%'}
                    onClose={this.onCloseBack}
                    visible={this.state.cardVisible}
                  >
                    {this.onSubstance()}
                  </Drawer>
                  <Drawer
                    title={this.state.drawer.bookName}
                    placement="left"
                    closable={false}
                    width={'50%'}
                    onClose={this.onClose}
                    visible={this.state.visible}
                  >
                    <p
                      style={{ letterSpacing: '1px' }}
                      dangerouslySetInnerHTML={{ __html: this.state.drawer.bookContent }}
                    />
                  </Drawer>
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
