import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from "@/pages/InformationExtraction/index.less";
import MainSearch from "@/components/MainSearch";
import {CommentOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import Search from "@/pages/KBQA/components/Search";

class kbqa extends Component {
  state = {
    val: true,
    question: '',
  };

  search = () => {
    this.setState({
      val: false,
    });
  };

  onChange = (e) => {
    let question = e.target.value
    this.setState({
      question: question,
    });
  };

  render() {
    const { val, question } = this.state;
    return (
      <PageContainer >
        {val === true ? (
          <div className={styles.indexSearch}>
            <MainSearch
              logo={<CommentOutlined />}
              text={'智能知识·问答'}
              engText={'KBQA·Platform'}
            />
            <Input
              size={'large'}
              className={styles.input}
              placeholder={'请输入问题：如：孙中山的妻子的爸爸是谁？'}
              allowClear
              onChange={this.onChange}
            />
            <Button type="primary" className={styles.button} size={'large'} onClick={this.search}>
              知识问答
            </Button>
          </div>
        ) : (
          <Search state={'question'} parentSearch={question} />
        )}

      </PageContainer>
    );
  }
}
export default kbqa;
