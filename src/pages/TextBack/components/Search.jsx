import React, { PureComponent } from 'react';
import { Input, Button, message } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import BookCard from '@/components/BookCard';

@connect(({ knowledge, loading }) => ({
  knowledge,
  loading: loading.effects['knowledge/getSubstance'],
}))
class search extends PureComponent {
  state = {
    searchValue: '',
    substance: [],
    loading: false,
  };

  componentDidMount() {
    const { parentSearch } = this.props;
    if (parentSearch !== '') {
      this.setState({
        searchValue: parentSearch,
      });
      this.search(parentSearch);
    }
  }

  onChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledge/getSubstance',
      payload: value !== null ? value : this.state.searchValue,
      callback: (response) => {
        if (response.length === 0) {
          message.warning('未检索到其语料回溯！');
        }
        if (response !== null) {
          this.setState({
            substance: response,
          });
        }
      },
    });
  };

  render() {
    const { loading } = this.props;
    const { substance } = this.state;
    const loadings = loading === undefined ? false : loading;
    return (
      <div className={styles.search}>
        <Input
          size={'large'}
          className={styles.input}
          placeholder="请输入实体知识 / 三元组(关系) / 问题驱动："
          allowClear
          value={this.state.searchValue}
          onChange={this.onChange}
        />
        <Button
          type="primary"
          className={styles.button}
          size={'large'}
          onClick={() => this.search(null)}
        >
          语料回溯
        </Button>
        <BookCard colSpan={12} loading={loadings} substance={substance} show={true} />
      </div>
    );
  }
}

export default search;
