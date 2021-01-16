import { ForkOutlined,DeploymentUnitOutlined,ShareAltOutlined } from '@ant-design/icons';
import styles from "@/pages/KnowledgeSearch/index.less";
import React from "react";
import { Row, Col } from 'antd';

const empty = () => {
  return (
    <Row className={styles.empty}>
      <Col span={8}>
        <ForkOutlined className={styles.icon1} />
      </Col>
      <Col span={8}>
        <DeploymentUnitOutlined className={styles.icon2} />
        <p className={styles.text}>构建实体知识图谱</p>
      </Col>
      <Col span={8}>
        <ShareAltOutlined className={styles.icon3} />
      </Col>
    </Row>
  )
}

export default empty
