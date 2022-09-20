import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from "@/pages/InformationExtraction/index.less";
import MainSearch from "@/components/MainSearch";
import {UngroupOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import Search from "@/pages/InformationExtraction/components/Search";

class informationExtraction extends Component {
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
    let entityValue = e.target.value
    this.setState({
      searchValue: entityValue,
    });
  };

  render() {
    const { val, searchValue } = this.state;
    return (
      <PageContainer>
        {val === true ? (
          <div className={styles.indexSearch}>
            <MainSearch
              logo={<UngroupOutlined />}
              text={'大数据平台·知识抽取'}
              engText={'Big Data Platform·Knowledge Extraction'}
            />
            <Input
              size={'large'}
              className={styles.input}
              placeholder={'请输入想要抽取的实体：（如：孙科）'}
              allowClear
              onChange={this.onChange}
            />
            <Button type="primary" className={styles.button} size={'large'} onClick={this.search}>
              开始知识抽取
            </Button>
          </div>
        ) : (
          <Search state={'web'} parentSearch={searchValue} />
        )}

      </PageContainer>
    );
  }
}
export default informationExtraction;
