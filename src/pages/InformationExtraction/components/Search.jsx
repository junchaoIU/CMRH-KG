import React, { PureComponent } from 'react';
import {Input, Button, Tabs, Row, Col, Spin, Descriptions, Timeline, Tooltip, Progress} from 'antd';
import styles from '../index.less';
import ReactJson from 'react-json-view'
import {connect} from "dva";
import {ClockCircleTwoTone, CloudTwoTone, EnvironmentTwoTone, PushpinTwoTone, TagsOutlined} from "@ant-design/icons";
const { TabPane } = Tabs;

@connect(({ information, loading }) => ({
  information,
  loading: loading.effects['information/getWebKG'],
}))

@connect(({ information, loading }) => ({
  information,
  submitting: loading.effects['information/getProcessNum'],
}))

class search extends PureComponent {
  state = {
    searchValue: '',
    webKGDic:{"return_code": 500, "return_info": "暂无请求"},
    processNum:0,
    processTime:0,
    interval:null
  };

  componentDidMount() {
    const { parentSearch } = this.props;
    if (parentSearch !== '') {
      this.setState({
        searchValue: parentSearch,
      });
      this.handleSearch(parentSearch);
    }
  }

  handleWebKGExtraction(entityValue) {
    const {dispatch} = this.props;
    this.setState({webKGDic:{"return_code": 500, "return_info": "正在知识抽取中，请稍等...."}})
    dispatch({
      type: 'information/getProcessNum',
      payload: entityValue,
      callback: (response) => {
        if (response["return_code"] === 200){
          this.setState({
            processTime:response["result"]
          });
        }
        this.move(response["result"]);
      },
    });
    dispatch({
      type: 'information/getWebKG',
      payload: entityValue,
      callback: (response) => {
        if (response["return_code"] == 200){
          this.setState({
            webKGDic: response,
            processTime:0,
            processNum:0
          });
        }
        clearInterval(this.state.interval);
      },
    });
  }

  onChange = (e) => {
    let entityValue = e.target.value
    this.setState({
      searchValue: entityValue,
    });
  };

  handleSearch = (value) => {
    this.handleWebKGExtraction(value);
  };

  transferRelation = (relationDic) => {
    const relationList = []
    Object.keys(relationDic).forEach(function(key){
      relationList.push(<Descriptions.Item label={key}>{relationDic[key]}</Descriptions.Item>)
    });
    return relationList
  }

  transferAttributes = (attributesDic) => {
    const attributesList = []
    Object.keys(attributesDic).forEach(function(key){
      attributesList.push(<Descriptions.Item label={key}>{attributesDic[key]}</Descriptions.Item>)
    });
    return attributesList
  }

  transferTimeLine = (timeLineDic) => {
    const timeLineList = []
    for(var i in timeLineDic){
      timeLineList.push(
        <Timeline.Item key={timeLineDic[i][3]} dot={<TagsOutlined style={{ fontSize: '20px' }} />}>
          <p>
            <PushpinTwoTone twoToneColor="#eb2f96" className={styles.icon} />
            {timeLineDic[i][3]}
          </p>
          <p>
            <ClockCircleTwoTone twoToneColor="#52c41a" className={styles.icon} />
            {timeLineDic[i][0]}
          </p>
          <p>
            <EnvironmentTwoTone twoToneColor="#adc6ff" className={styles.icon} />
            {timeLineDic[i][1]}
          </p>
          <Tooltip
            color={'#2db7f5'}
            placement="topLeft"
            arrowPointAtCenter
          >
            <p className={styles.detail}>
              <CloudTwoTone twoToneColor="#87e8de" className={styles.icon} />
              {timeLineDic[i][2]}
            </p>
          </Tooltip>
        </Timeline.Item>)
    }
    return timeLineList
  }

  move = (processTime) => {
    if (this.state.webKGDic["return_code"] ===500 && this.state.processNum<100) {
      this.state.interval = setInterval(()=> {
        let num = this.state.processNum
        num = parseInt(num + 2*(100/processTime))
        this.setState({processNum: num})
      }, 1000)
    }
  }

  render() {
    return (
      <div className={styles.search}>
        <Input
          size={'large'}
          className={styles.input}
          placeholder={'请输入事件实体：'}
          allowClear
          value={this.state.searchValue}
          onChange={this.onChange}
        />
        <Button
          type="primary"
          className={styles.button}
          size={'large'}
          onClick={() => this.handleSearch(this.state.searchValue)}
        >
          开始检索
        </Button>
        <Row>
          <Col span={4}/>
          <Col span={16}>
            {this.state.webKGDic?
              <Tabs defaultActiveKey="table">
                <TabPane tab={<span>TABLE VISON</span>} key="table">
                  <h1>{this.state.webKGDic.return_info}</h1>
                  {this.state.webKGDic.result?
                    <div>
                      <Descriptions
                        bordered
                        title="简介"
                      >
                        <Descriptions.Item label="知识简介">{this.state.webKGDic.result.introduction}</Descriptions.Item>
                      </Descriptions><br/>
                      <Descriptions
                        bordered
                        title="属性"
                      >
                        {this.transferAttributes(this.state.webKGDic.result.attributes)}
                      </Descriptions><br/>
                      <Descriptions
                        bordered
                        title="关系"
                      >
                        {this.transferRelation(this.state.webKGDic.result.relation)}
                      </Descriptions><br/>
                      <Descriptions
                        bordered
                        title="时空信息"
                      >
                        <div className={styles.jsonBoard}>
                          <Timeline mode={'left'}>
                            {this.transferTimeLine(this.state.webKGDic.result.timeLine)}
                          </Timeline>
                        </div>
                      </Descriptions><br/>
                    </div>
                    :<Progress
                      type="circle"
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={this.state.processNum}
                    />}
                </TabPane>
                <TabPane tab={<span>JSON VISON</span>} key="json">
                  <h1>{this.state.webKGDic.return_info}</h1>
                  {this.state.webKGDic.result?
                    <div className={styles.jsonBoard}>
                      <ReactJson src={this.state.webKGDic.result}/>
                    </div>
                    :<Progress
                      type="circle"
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={this.state.processNum}
                    />}
                </TabPane>
              </Tabs>
              :"" }

          </Col>
          <Col span={4}/>
        </Row>
      </div>
    );
  }
}

export default search;
