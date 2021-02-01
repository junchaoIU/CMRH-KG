import React,{ Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Search from "./components/Search";

class relationSearch extends Component {
  render(){
    return (
      <PageContainer>
        <Search />
      </PageContainer>
    );
  }
};
export default relationSearch;
