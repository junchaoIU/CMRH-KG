import React, { PureComponent } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import SearchResult from './components/SearchResult';
import MainSearch from '../../components/MainSearch';
import { FileSearchOutlined } from '@ant-design/icons';
import SearchInput from '@/pages/KnowledgeSearch/components/SearchInput';

class knowledgeSearch extends PureComponent {
  state = {
    searchValue: [],
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
            <SearchInput
              className={styles.centerCascader}
              onChange={this.onChange}
              search={this.search}
              searchValue={this.state.searchValue}
            />
          </div>
        ) : (
          <SearchResult parentSearch={searchValue} />
        )}
      </PageContainer>
    );
  }
}

export default knowledgeSearch;
