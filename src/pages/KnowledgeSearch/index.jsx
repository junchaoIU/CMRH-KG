import React, { PureComponent } from 'react';
import { Cascader, Button, Row, Col } from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import Search from './components/Search';
import MainSearch from '../../components/MainSearch';
import catalogData from './components/catalog';
import { FileSearchOutlined } from '@ant-design/icons';

class knowledgeSearch extends PureComponent {
  state = {
    searchValue: [],
    inpValue: [],
    val: true,
  };

  search = () => {
    this.setState({
      val: false,
    });
  };

  onChange = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  filter = (inputValue, path) => {
    this.setState({
      searchValue: inputValue,
    });
    return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  displayRender(label) {
    return label[label.length - 1];
  }

  render() {
    const { searchValue, val } = this.state;
    return (
      <PageContainer>
        {val === true ? (
          <div className={styles.indexSearch}>
            <MainSearch
              logo={<FileSearchOutlined />}
              text={'知识·检索'}
              engText={'Knowledge Retrieval'}
            />
            <Cascader
              allowClear={this.clear}
              className={styles.cascader}
              options={catalogData}
              onChange={this.onChange}
              placeholder="请选择或输入检索的知识点吧"
              displayRender={this.displayRender}
              size="large"
              showSearch={{ filter: this.filter, matchInputWidth: false }}
              value={searchValue}
            />
            <Button type="primary" size={'large'} onClick={this.search}>
              检索一下
            </Button>
          </div>
        ) : (
          <Search parentSearch={searchValue} />
        )}
      </PageContainer>
    );
  }
}
export default knowledgeSearch;
