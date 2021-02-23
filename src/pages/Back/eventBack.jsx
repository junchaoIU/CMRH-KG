import React,{ Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Search from "./components/Search";
import { connect } from 'dva';

@connect(({ back,loading }) => ({
  back,
  submitting: loading.effects['back/back'],
}))

class eventBack extends Component {
  componentDidMount(){
    const { dispatch } = this.props
    dispatch({
      type: 'back/getAllEvent',
    })
  }

  render(){
    const { back: { allEvent } } = this.props
    return (
      <PageContainer>
        <Search state={"event"} allEvent={allEvent}/>
      </PageContainer>
    );
  }
};
export default eventBack;
