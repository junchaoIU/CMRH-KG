import styles from '@/pages/KnowledgeSearch/index.less';
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
          <Tabs.TabPane tab="实体语料回溯" key="2">
            <BookCard substance={substance} loading={false} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default information;
