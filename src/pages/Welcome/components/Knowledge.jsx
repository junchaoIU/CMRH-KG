import React,{ Component } from 'react';
import { Card,Typography,Row,Col, Divider } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';

@connect(({ welcome,loading }) => ({
  welcome,
  submitting: loading.effects['welcome/welcome'],
}))

class knowledge extends Component {

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'welcome/getHomeData',
    });
  }
  render(){
    const { welcome:{knowledge} } = this.props
    return (
      <div>
        <Typography className={styles.knowledge}>
         本体知识库
        </Typography>
        <Row justify="center" gutter={24} style={{ margin: '0 0 20px 0' }}>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>
                知识实体数量
              </p>
              <p className={styles.cardNum}>
                {knowledge.individual}
              </p>
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>
                三元组数量
              </p>
              <p className={styles.cardNum}>
                {knowledge.statement}
              </p>
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>
                关系种类数量
              </p>
              <p className={styles.cardNum}>
                {knowledge.objectProperty}
              </p>
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>
                属性种类数量
              </p>
              <p className={styles.cardNum}>
                {knowledge.dataProperty}
              </p>
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false} className={styles.minCard}>
              <p className={styles.cardTitle}>
                文献语料数量
              </p>
              <p className={styles.cardNum}>
                {knowledge.books}
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};
export default knowledge;
