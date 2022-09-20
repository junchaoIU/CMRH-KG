import styles from '../index.less';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import BookCard from '@/components/BookCard';

@connect(({ knowledge, loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))
class information extends PureComponent {
  render() {
    const { substance } = this.props;
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard}>
          <Tabs.TabPane tab="实体语料关联" key="2" className={styles.book}>
            <BookCard colSpan={24} substance={substance} loading={false} show={true} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default information;
