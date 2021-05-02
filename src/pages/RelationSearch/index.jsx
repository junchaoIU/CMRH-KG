import React, { PureComponent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MainSearch from '../../components/MainSearch';
import styles from './index.less';
import { NodeIndexOutlined } from '@ant-design/icons';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';

class relationSearch extends PureComponent {
  state = {
    val: true,
    object: '',
    subject: '',
  };

  search = () => {
    this.setState({
      val: false,
    });
  };

  onChange = (e) => {
    this.setState({
      object: e.target.value,
    });
  };

  onChange1 = (e) => {
    this.setState({
      subject: e.target.value,
    });
  };

  render() {
    const { val, object, subject } = this.state;
    return (
      <PageContainer>
        {val === true ? (
          <div className={styles.indexSearch}>
            <MainSearch
              logo={<NodeIndexOutlined />}
              text={'关系·检索'}
              engText={'Relation Retrieval'}
            />
            <SearchInput search={this.search} onChange={this.onChange} onChange1={this.onChange1} />
          </div>
        ) : (
          <SearchResult parentObject={object} parentSubject={subject} />
        )}
      </PageContainer>
    );
  }
}
export default relationSearch;
