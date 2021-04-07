import React, { PureComponent } from 'react';
import styles from './index.less';
import minEmpty from '@/components/Empty/minEmpty';
import { Tabs, Avatar, Tag } from 'antd';

class Information extends PureComponent {
  state = {
    detail: [],
    relevance: [],
    people: [],
    categorys: [
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
    ],
    briefUrl: '',
    brief: '',
  };

  componentDidMount() {
    const { propSearch, detailData, chartsData } = this.props;
    this.computedValue(propSearch, detailData, chartsData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.propSearch !== this.props.chartsData) {
      this.computedValue(nextProps.propSearch, nextProps.detailData, nextProps.chartsData);
    }
  }

  computedValue = (propSearch, detailData, chartsData) => {
    const { categorys } = this.state;
    const relevanceArr = [];
    const detailArr = [];
    const peopleArr = [];
    chartsData.links !== null
      ? chartsData.links.map((item) => {
          if (item.category === '相关事件') {
            relevanceArr.push({
              name: item.target,
              url: `http://gzknowledge.cn:2222/${item.target}.jpg`,
            });
          } else if (categorys.includes(item.category)) {
            if (item.target.substring(0, 1) === 'y') {
              detailArr.push(`${item.category} ${item.target.substr(1)}`);
            } else {
              detailArr.push(`${item.category} ${item.target}`);
            }
          } else {
            peopleArr.push({
              name: item.target,
              url: `http://gzknowledge.cn:2222/${item.target}.jpg`,
            });
          }
        })
      : '';

    // 知识简介
    let briefStr = '';
    detailData.links !== null
      ? detailData.links.map((item) => {
          if (item.category === 'comment') {
            briefStr = item.target;
          } else {
            detailArr.push(`${item.label} ${item.target}`);
          }
        })
      : '';
    this.setState({
      detail: detailArr,
      relevance: relevanceArr,
      people: peopleArr,
      briefUrl: `http://gzknowledge.cn:2222/${propSearch}.jpg`,
      brief: briefStr,
    });
  };

  render() {
    const { briefUrl, brief, detail, relevance, people } = this.state;
    const { propSearch } = this.props;
    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="知识简介" key="1">
          <div className={styles.contentDiv}>
            <div>
              <Avatar className={styles.authorImg} size={64} src={briefUrl} />
              <span className={styles.author}>
                {typeof propSearch === 'string' ? propSearch : propSearch[0]}
              </span>
            </div>
            <p className={styles.briefContent}>{brief}</p>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="详细信息" key="2">
          <div className={styles.contentDiv}>
            {detail.length > 0
              ? detail.map(function (item, index) {
                  return (
                    <Tag className={styles.detail} color="geekblue" key={index}>
                      {item}
                    </Tag>
                  );
                })
              : minEmpty}
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
                        <Tag className={styles.detail} color="gold">
                          {item.name}
                        </Tag>
                      </p>
                    </div>
                  );
                })
              : minEmpty}
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
                        <Tag className={styles.detail} color="green">
                          {item.name}
                        </Tag>
                      </p>
                    </div>
                  );
                })
              : minEmpty}
          </div>
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default Information;
