import styles from '../index.less';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Timeline,
  Tabs,
  Tooltip,
  Avatar,
  Col,
  Tag,
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
    visible: false,
    cardVisible: false,
    substance: [],
    loading: true,
    drawer: [],
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
  showDrawer = (e) => {
    const drawerData = this.state.substance[e.currentTarget.value];
    this.setState({
      drawer: drawerData,
      visible: true,
    });
  };
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

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  timeLine = () => {
    const {
      childEvent: { series },
    } = this.props;
    const onClose = () => {
      this.setState({
        cardVisible: false,
      });
    };
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
        <Drawer
          title="事件语料回溯"
          placement="right"
          closable={false}
          width={'70%'}
          onClose={onClose}
          visible={this.state.cardVisible}
          getContainer={false}
          style={{ position: 'absolute', transform: 'none' }}
        >
          {this.onSubstance()}
        </Drawer>
      </Timeline>
    );
  };
  onInformation = () => {
    const { propSearch, detailData, chartsData } = this.props;
    // 详细信息
    let detail = [];
    // 相关事件
    let relevance = [];
    // 相关人物
    let people = [];
    const categorys = [
      '相关遗存',
      '事件地点',
      '地理位置',
      '出生地点',
      '签订地点',
      '开始时间',
      '结束时间',
      '出生日期',
      '逝世日期',
      '签订时间',
    ];
    chartsData.links !== null
      ? chartsData.links.forEach((item) => {
          if (item.category === '相关事件') {
            relevance.push({
              name: item.target,
              url: `http://gzknowledge.cn:2222/${item.target}.jpg`,
            });
          } else if (categorys.includes(item.category)) {
            if (item.target.substring(0, 1) === 'y') {
              detail.push(`${item.category} ${item.target.substr(1)}`);
            } else {
              detail.push(`${item.category} ${item.target}`);
            }
          } else {
            people.push({
              name: item.target,
              url: `http://gzknowledge.cn:2222/${item.target}.jpg`,
            });
          }
        })
      : '';

    // 知识简介
    let brief = '';
    const briefUrl = `http://gzknowledge.cn:2222/${propSearch}.jpg`;
    detailData.links !== null
      ? detailData.links.forEach((item) => {
          if (item.category === 'comment') {
            brief = item.target;
          } else {
            detail.push(`${item.label} ${item.target}`);
          }
        })
      : '';

    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="知识简介" key="1">
          <div className={styles.contentDiv}>
            <div>
              <Avatar className={styles.authorImg} size={64} src={briefUrl} />
              <span className={styles.author}>{propSearch}</span>
            </div>
            <p className={styles.briefContent}>{brief}</p>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="详细信息" key="2">
          <div className={styles.contentDiv}>
            {detail.length > 0
              ? detail.map(function (item, index) {
                  return (
                    <Tag className={styles.detailText} color="geekblue" key={index}>
                      {item}
                    </Tag>
                  );
                })
              : Emptying}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="相关事件" key="3">
          <div className={styles.contentDiv}>
            {relevance.length > 0
              ? relevance.map(function (item, index) {
                  return (
                    <div className={styles.relevance} key={index}>
                      <Avatar className={styles.relevanceImg} size={64} src={item.url} />
                      <p>
                        <Tag className={styles.detailText} color="gold">
                          {item.name}
                        </Tag>
                      </p>
                    </div>
                  );
                })
              : Emptying}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="相关人物" key="4">
          <div className={styles.contentDiv}>
            {people.length > 0
              ? people.map(function (item, index) {
                  return (
                    <div className={styles.relevance} key={index}>
                      <Avatar className={styles.relevanceImg} size={64} src={item.url} />
                      <p>
                        <Tag className={styles.detailText} color="green">
                          {item.name}
                        </Tag>
                      </p>
                    </div>
                  );
                })
              : Emptying}
          </div>
        </Tabs.TabPane>
      </Tabs>
    );
  };

  render() {
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard}>
          <Tabs.TabPane tab="事件时间线" key="1">
            {this.timeLine()}
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
          <Tabs.TabPane tab="事件信息" key="2">
            {this.onInformation()}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default information;
