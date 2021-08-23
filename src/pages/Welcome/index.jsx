import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import styles from './index.less';
import Knowledge from '@/pages/Welcome/components/Knowledge';
import NumService from '@/pages/Welcome/components/NumService';

class home extends Component {
  render() {
    return (
      <div>
        <Card className={styles.header}>
          <Typography className={styles.title}>广州革命历史数字图书馆</Typography>
          <Typography className={styles.text}>广州革命历史知识图谱数字信息资源平台</Typography>
        </Card>
        <Knowledge />
        <NumService />
      </div>
    );
  }
}
export default home;
