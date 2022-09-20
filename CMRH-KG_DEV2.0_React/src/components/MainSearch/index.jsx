import React, { PureComponent } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
class MainSearch extends PureComponent {
  render() {
    const { logo, text, engText, searchInput } = this.props;
    return (
      <Row className={styles.top}>
        <Col span={10} className={styles.icon}>
          {logo}
        </Col>
        <Col span={14} className={styles.right}>
          <p>{text}</p>
          <p className={styles.engText}>{engText}</p>
        </Col>
        {searchInput}
      </Row>
    );
  }
}

export default MainSearch;
