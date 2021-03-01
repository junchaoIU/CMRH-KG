import { ForkOutlined, DeploymentUnitOutlined, ShareAltOutlined } from '@ant-design/icons';
import styles from './index.less';
import React from 'react';
import { Row, Col } from 'antd';

const Empty = () => {
  return (
    <Row className={styles.empty}>
      <Col span={8}>
        <ForkOutlined className={styles.icon1} />
      </Col>
      <Col span={8} style={{ textAlign: 'center' }}>
        <DeploymentUnitOutlined className={styles.icon2} />
        <p className={styles.text}>暂无数据</p>
      </Col>
      <Col span={8}>
        <ShareAltOutlined className={styles.icon3} />
      </Col>
    </Row>
  );
};

export default Empty;
