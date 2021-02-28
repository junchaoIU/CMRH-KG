import React, {PureComponent} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import Search from "./components/Search";
import styles from "./index.less";
import {Input, Button, Row, Col} from 'antd';
import {
  SwapOutlined,
  NodeIndexOutlined
} from '@ant-design/icons';

class relationSearch extends PureComponent {
  state = {
    val: true,
    object: '',
    subject: ''
  }

  search = () => {
    this.setState({
      val: false,
    })
  }
  onChange = (e) => {
    this.setState({
      object: e.target.value
    })
  }

  onChange1 = (e) => {
    this.setState({
      subject: e.target.value
    })
  }

  render() {
    const {val, object, subject} = this.state
    return (
      <PageContainer>
        {val === true ? <div className={styles.indexSearch}>
          <Row className={styles.top}>
            <Col span={10} className={styles.icon}>
              <NodeIndexOutlined/>
            </Col>
            <Col span={14} className={styles.right}>
              <p>关系·检索</p>
              <p className={styles.engText}>Relation Retrieval</p>
            </Col>
          </Row>
          <Input.Group compact>
            <Input
              style={{marginRight: "3px"}}
              className={styles.input} size={"large"} placeholder="知识点一：" allowClear onChange={this.onChange}/>
            <SwapOutlined className={styles.iconR}/>
            <Input
              style={{marginLeft: "3px"}}
              className={styles.input} size={"large"} placeholder="知识点二：" allowClear onChange={this.onChange1}/>
            <Button type="primary" className={styles.button} size={"large"} onClick={this.search}>检索一下</Button>
          </Input.Group>
        </div> : <Search parentObject={object} parentSubject={subject}/>
        }
      </PageContainer>
    );
  }
};
export default relationSearch;
