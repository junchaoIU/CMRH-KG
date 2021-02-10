import React,{ Component } from 'react';
import { Card,Typography,Row,Col, Divider } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import MapCharts from './components/MapCharts'
class back extends Component {
  render(){
    return (
      <PageContainer>
        <MapCharts/>
      </PageContainer>
    );
  }
};
export default back;
