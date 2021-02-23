import React,{ Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Search from "./components/Search";
class peopleBack extends Component {

  render(){
    return (
      <PageContainer>
        <Search state={"people"}/>
      </PageContainer>
    );
  }
};
export default peopleBack;
