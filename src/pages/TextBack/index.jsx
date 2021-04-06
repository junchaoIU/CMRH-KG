import React, { Component } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import Search from './components/Search';
import { UngroupOutlined } from '@ant-design/icons';
import MainSearch from '@/components/MainSearch';

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
            <MainSearch
              logo={<UngroupOutlined />}
              text={'语料回溯·检索'}
              engText={'Corpus Back Retrieval'}
            />
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
