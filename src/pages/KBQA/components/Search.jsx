import React, { PureComponent } from 'react';
import {Input, Button, Card, Row, Col, Spin} from 'antd';
import styles from '../index.less';
import {connect} from "dva";

@connect(({ question, loading }) => ({
  question,
  loading: loading.effects['answer/getQuestion'],
}))

class search extends PureComponent {
  state = {
    question: '',
    answer:''
  };

  componentDidMount() {
    const { parentSearch } = this.props;
    if (parentSearch !== '') {
      this.setState({
        question: parentSearch,
      });
      this.handleSearch(parentSearch);
    }
  }

  handleQuestion(question) {
    console.log(question)
    const {dispatch} = this.props;
    dispatch({
      type: 'answer/getQuestion',
      payload: question,
      callback: (response) => {
        if (response.code == 200) {
          this.setState({
            answer: response.data,
          });
          console.log(response)
        }
      },
    });
  }

  onChange = (e) => {
    let question = e.target.value
    this.setState({
      question: question,
    });
  };

  handleSearch = (value) => {
    this.setState({answer:""})
    this.handleQuestion(value);
  };

  render() {
    return (
      <div className={styles.search}>
        <Input
          size={'large'}
          className={styles.input}
          placeholder={'请输入问题：'}
          allowClear
          value={this.state.question}
          onChange={this.onChange}
        />
        <Button
          type="primary"
          className={styles.button}
          size={'large'}
          onClick={() => this.handleSearch(this.state.question)}
        >
          开始检索
        </Button>
        <Row>
          <Col span={4}/>
          <Col span={16}>
            {this.state.answer?
              <Card
                style={{ margin:"auto", width: 800, height: 400, marginTop:40, padding:20, fontSize:20, textAlign:"left"}}
                title="CantonKG QA"
              >
                {"问题:"+ this.state.question}
                <br/><br/>
                {"回答:" + this.state.answer}
              </Card>
              :<Spin/>}

          </Col>
          <Col span={4}/>
        </Row>
      </div>
    );
  }
}

export default search;
