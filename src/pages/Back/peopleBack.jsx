import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Search from './components/Search';
import styles from '@/pages/Back/index.less';
import { Input, Button, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class peopleBack extends Component {
  state = {
    val: true,
    searchValue: '',
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
    const { val, searchValue } = this.state;
    return (
      <PageContainer>
        {val === true ? (
          <div className={styles.indexSearch}>
            <Row className={styles.top}>
              <Col span={10} className={styles.icon}>
                <UserOutlined />
              </Col>
              <Col span={14} className={styles.right}>
                <p>人物回溯·检索</p>
                <p className={styles.engText}>People Back Retrieval</p>
              </Col>
            </Row>
            <Input
              size={'large'}
              className={styles.input}
              placeholder={'请输入人物实体：'}
              allowClear
              onChange={this.onChange}
            />
            <Button type="primary" className={styles.button} size={'large'} onClick={this.search}>
              开始检索
            </Button>
          </div>
        ) : (
          <Search state={'people'} parentSearch={searchValue} />
        )}
      </PageContainer>
    );
  }
}
export default peopleBack;
