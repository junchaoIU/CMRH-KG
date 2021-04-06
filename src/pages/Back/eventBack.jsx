import React, { PureComponent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Search from './components/Search';
import { connect } from 'dva';
import styles from './index.less';
import { Input, Button, Row, Col } from 'antd';
import { InteractionOutlined } from '@ant-design/icons';
import MainSearch from '@/components/MainSearch';

@connect(({ back, loading }) => ({
  back,
  submitting: loading.effects['back/back'],
}))
class eventBack extends PureComponent {
  state = {
    val: true,
    searchValue: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'back/getAllEvent',
    });
  }

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
    const {
      back: { allEvent },
    } = this.props;
    const { val, searchValue } = this.state;
    return (
      <div style={{ margin: '24px 2px 0' }}>
        {val === true ? (
          <div className={styles.indexSearch}>
            <MainSearch
              logo={<InteractionOutlined />}
              text={'事件回溯·检索'}
              engText={'Event Back Retrieval'}
            />
            <Input
              size={'large'}
              className={styles.input}
              placeholder={'请输入事件实体：'}
              allowClear
              onChange={this.onChange}
            />
            <Button type="primary" className={styles.button} size={'large'} onClick={this.search}>
              开始检索
            </Button>
          </div>
        ) : (
          <Search state={'event'} allEvent={allEvent} parentSearch={searchValue} />
        )}
      </div>
    );
  }
}
export default eventBack;
