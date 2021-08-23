import React, { Component } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import CountUp from 'react-countup';
import styles from '../index.less';
import { connect } from 'dva';

@connect(({ welcome, loading }) => ({
  welcome,
  submitting: loading.effects['welcome/welcome'],
}))
class knowledge extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'welcome/getHomeData',
    });
  }

  render() {
    // eslint-disable-next-line no-shadow
    const {
      welcome: { knowledge },
    } = this.props;
    return (
      <div>
        <Typography className={styles.knowledge}>本体知识库</Typography>
        <Row justify="center" gutter={24} style={{ margin: '0 0 20px 0' }}>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>知识实体数量</p>
              <p className={styles.cardNum}>
                <CountUp end={knowledge.individual} start={0} duration={1} />
              </p>
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>三元组数量</p>
              <p className={styles.cardNum}>
                <CountUp end={knowledge.statement} start={0} duration={1} />
              </p>
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>关系种类数量</p>
              <p className={styles.cardNum}>
                <CountUp end={knowledge.objectProperty} start={0} duration={1} />
              </p>
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>属性种类数量</p>
              <p className={styles.cardNum}>
                <CountUp end={knowledge.dataProperty} start={0} duration={1} />
              </p>
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>文献语料数量</p>
              <p className={styles.cardNum}>
                <CountUp end={knowledge.books} start={0} duration={1} />
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default knowledge;
