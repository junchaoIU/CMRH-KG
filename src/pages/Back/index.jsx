import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MapCharts from './components/MapCharts';
class back extends Component {
  render() {
    return (
      <PageContainer>
        <MapCharts />
      </PageContainer>
    );
  }
}
export default back;
