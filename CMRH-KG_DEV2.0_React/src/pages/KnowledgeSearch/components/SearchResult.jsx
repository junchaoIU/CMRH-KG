import React, { PureComponent } from 'react';
import { Row, Col, message, Spin } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import Charts from './Charts';
import Empty from '../../../components/Empty/index';
import Information from './Information';
import SearchInput from '@/pages/KnowledgeSearch/components/SearchInput';

@connect(({ knowledge, loading }) => ({
  knowledge,
  loading: loading.effects['knowledge/getKeyword'],
}))
class SearchResult extends PureComponent {
  state = {
    searchValue: [],
    chartsData: [],
    val: false,
    propSearch: [],
    detailData: [],
  };

  componentDidMount() {
    const { parentSearch } = this.props;
    if (parentSearch.length !== 0) {
      this.computedSearchValue(parentSearch);
    }
  }

  onChange = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  computedSearchValue = (value) => {
    let arr = [];
    if (typeof value === 'string') {
      arr[0] = value;
    } else {
      arr = value;
    }
    this.setState({
      searchValue: arr,
    });
    this.handleSearch(arr);
  };

  search = (v) => {
    if (v.length !== undefined) {
      this.setState({
        searchValue: v,
      });
    }
    const { searchValue } = this.state;
    this.computedSearchValue(searchValue);
    this.setState({
      chartsData: [],
      val: false,
    });
  };

  handleSearch = (value) => {
    const data = value.slice(-1);
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledge/getKeyword',
      payload: data,
      callback: (response) => {
        if (response !== null) {
          this.setState({
            chartsData: response,
            propSearch: data,
            val: true,
          });
        }
      },
    });
    dispatch({
      type: 'knowledge/getAttribute',
      payload: data,
      callback: (response) => {
        if (response !== null) {
          this.setState({
            detailData: response,
          });
        }
        if (response.links === null) {
          message.warning('找不到您检索的知识点！');
        }
      },
    });
  };

  render() {
    const { loading } = this.props;
    const { chartsData, val, searchValue, propSearch, detailData } = this.state;
    const loadings = loading === undefined ? false : loading;
    return (
      <div>
        <div className={styles.search}>
          <SearchInput
            className={styles.cascader}
            onChange={this.onChange}
            search={this.search}
            searchValue={searchValue}
          />
          <Spin spinning={loadings}>
            {val && chartsData.length !== 0 && detailData.length !== 0 ? (
              <Row className={styles.content}>
                <Col span={14}>
                  <Charts chartsData={chartsData} propSearch={propSearch} clickWord={this.search} />
                </Col>
                <Col span={10}>
                  <Information
                    chartsData={chartsData}
                    propSearch={propSearch}
                    detailData={detailData}
                  />
                </Col>
              </Row>
            ) : (
              <Empty />
            )}
          </Spin>
        </div>
      </div>
    );
  }
}

export default SearchResult;
