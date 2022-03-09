import styles from '@/pages/KnowledgeSearch/index.less';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, message, Checkbox, Divider, Button, Drawer } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import Information from '@/pages/Common/Information';
import BookCard from '@/components/BookCard';
import LineDrawer from '@/pages/Common/LineDrawer';

@connect(({ knowledge, loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))
class information extends PureComponent {
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    cardVisible: false,
    substance: [],
    loading: true,
  };

  onClick = (index) => {
    this.setState({
      substance: [],
      loading: true,
    });
    if (index === '2') {
      const backWord = this.props.propSearch[0];
      this.onDispatch(backWord);
    }
  };

  onDispatch = (backWord) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledge/getSubstance',
      payload: backWord,
      callback: (response) => {
        if (response !== null) {
          this.setState({
            substance: response,
            loading: false,
          });
        }
      },
    });
  };

  onCloseBack = () => {
    this.setState({
      cardVisible: false,
    });
  };
  // 三元组语料关联
  onThree = () => {
    const { chartsData } = this.props;
    const { loading, substance, cardVisible } = this.state;
    const three = [];
    chartsData.links !== null
      ? chartsData.links.map((item) => {
          if (item.target.substring(0, 1) === 'y') {
            three.push(`（${item.category}）${item.target.substr(1)}`);
          } else {
            three.push(`（${item.category}）${item.target}`);
          }
        })
      : '';
    const onCheckAllChange = (e) => {
      this.setState({
        checkedList: e.target.checked ? three : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    };
    const onChange = (checkedList) => {
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < three.length,
        checkAll: checkedList.length === three.length,
      });
    };
    const onThreeSearch = () => {
      this.setState({
        substance: [],
        loading: true,
      });
      if (this.state.checkedList.length > 0) {
        const threeWord = `${this.props.propSearch[0]}${this.state.checkedList
          .join('')
          .replace(/\（.*?\）/g, '')}`;
        this.onDispatch(threeWord);
        this.setState({
          cardVisible: true,
        });
      } else {
        message.warning('请选择三元组！');
      }
    };
    return (
      <div className={styles.threeDiv}>
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={onCheckAllChange}
          checked={this.state.checkAll}
        >
          全选
        </Checkbox>
        <Button style={{ float: 'right' }} onClick={onThreeSearch}>
          <FileSearchOutlined />
          三元组语料关联
        </Button>
        <Divider />
        <Checkbox.Group
          options={three}
          className={styles.three}
          value={this.state.checkedList}
          onChange={onChange}
        />
        <LineDrawer
          onCloseBack={this.onCloseBack}
          cardVisible={cardVisible}
          loading={loading}
          substance={substance}
          style={{ position: 'absolute', transform: 'none' }}
        />
      </div>
    );
  };

  render() {
    const { propSearch, detailData, chartsData } = this.props;
    const { loading, substance } = this.state;
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard} onChange={this.onClick}>
          <Tabs.TabPane tab="实体信息" key="1" className={styles.innerCard}>
            <Information propSearch={propSearch} detailData={detailData} chartsData={chartsData} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="实体语料关联" key="2" className={styles.book}>
            <BookCard colSpan={24} loading={loading} substance={substance} show={true} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="三元组语料关联" key="3">
            {this.onThree()}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default information;
