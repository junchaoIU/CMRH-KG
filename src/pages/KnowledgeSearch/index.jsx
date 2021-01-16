import React,{ Component } from 'react';
import { Card,Typography,Row,Col,Divider } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import Search from './components/Search'
class knowledgeSearch extends Component {

  render(){
    return (
      <PageContainer>
        <Search />
      </PageContainer>
    );
  }
};
export default knowledgeSearch;
