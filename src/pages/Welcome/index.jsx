import React, { Component } from 'react';
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
          <Typography className={styles.text}>广州革命历史事件相关数字信息资源库</Typography>
        </Card>
        <Knowledge />
        <NumService />
      </div>
    );
  }
}
export default home;
