import React, { Component } from 'react';
import { Card, Input, Row, Col, Button } from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import Search from './components/Search';
import { UngroupOutlined } from '@ant-design/icons';
class textBack extends Component {
  state = {
    searchValue: '',
    val: true,
  };

  search = () => {
    this.setState({
      val: false,
    });
  };

  onChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  render() {
    const { searchValue, val } = this.state;
    return (
      <PageContainer>
        {val === true ? (
          <div className={styles.indexSearch}>
            <Row className={styles.top}>
              <Col span={10} className={styles.icon}>
                <UngroupOutlined />
              </Col>
              <Col span={14} className={styles.right}>
                <p>语料回溯·检索</p>
                <p className={styles.engText}>Corpus Back Retrieval</p>
              </Col>
            </Row>
            <Input
              size={'large'}
              className={styles.input}
              value={searchValue}
              placeholder="请输入实体知识 / 三元组(关系) / 问题驱动："
              allowClear
              onChange={this.onChange}
            />
            <Button type="primary" className={styles.button} size={'large'} onClick={this.search}>
              语料回溯
            </Button>
          </div>
        ) : (
          <Search parentSearch={searchValue} />
        )}
      </PageContainer>
    );
  }
}
export default textBack;
