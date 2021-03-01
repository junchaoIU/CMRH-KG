import React, { PureComponent } from 'react';
import { Input, Card, Spin, Button, message, Drawer, Col, Row } from 'antd';
import styles from '../index.less';
import Empty from '@/components/Empty';
import { connect } from 'dva';

@connect(({ knowledge, loading }) => ({
  knowledge,
  loading: loading.effects['knowledge/getSubstance'],
}))
class search extends PureComponent {
  state = {
    val: false,
    searchValue: '',
    substance: [],
    loading: false,
    drawer: [],
    visible: false,
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

  onSubstance = () => {
    const tip = this.state.substance.length > 0 ? this.state.substance[0].num : '';
    return (
      <div className={styles.substanceDiv}>
        <Card size="small" title={tip}>
          <Row justify="center">
            {this.state.substance.map((item, index) => {
              return (
                <Col span={12} key={index}>
                  <Card hoverable>
                    <div className={styles.bookImage}>
                      <img
                        style={{ height: '100px' }}
                        src={`http://39.101.193.14:2222//book/${item.fileName}.png`}
                      />
                    </div>
                    <p>{item.fileName}</p>
                    <p>简介</p>
                    <Button type={'primary'} value={index} onClick={this.showDrawer}>
                      查看详情
                    </Button>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card>
      </div>
    );
  };

  showDrawer = (e) => {
    const drawerData = this.state.substance[e.currentTarget.value];
    this.setState({
      drawer: drawerData,
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { loading } = this.props;
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
        <Spin spinning={loadings}>
          {this.state.substance.length > 0 ? this.onSubstance() : <Empty />}
        </Spin>
        <Drawer
          title={this.state.drawer.fileName}
          placement="left"
          closable={false}
          width={'50%'}
          onClose={this.onClose}
          visible={this.state.visible}
          style={{ animationTimingFunction: 'ease-out' }}
          maskStyle={{ opacity: '0.1', animation: '1s infinite', boxShadow: 'none' }}
        >
          <p
            style={{ letterSpacing: '1px' }}
            dangerouslySetInnerHTML={{ __html: this.state.drawer.content }}
          />
        </Drawer>
      </div>
    );
  }
}

export default search;
