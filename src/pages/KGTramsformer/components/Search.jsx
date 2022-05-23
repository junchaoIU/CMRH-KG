import React, { PureComponent } from 'react';
import {
  Input,
  Button,
  Tabs,
  Row,
  Col,
  Descriptions,
  Timeline,
  Tooltip,
  Progress,
  Collapse,
  Card,
  Radio,
  Upload, message
} from 'antd';
import styles from '../index.less';
import ReactJson from 'react-json-view'
import {connect} from "dva";
import {
  ClockCircleTwoTone,
  CloudTwoTone,
  EnvironmentTwoTone, InboxOutlined,
  PushpinTwoTone,
  TagsOutlined,
} from "@ant-design/icons";
import MainSearch from "@/components/MainSearch";
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Dragger } = Upload;

@connect(({ information, loading }) => ({
  information,
  loading: loading.effects['information/getTxtExtraction'],
}))

class search extends PureComponent {
  state = {
    searchValue: '',
    txtKGDic:{"return_code": 500, "return_info": "暂无请求"},
    processNum:0,
    interval:null,
    modeValue:'input'
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

  handleSearch = (value) => {
    this.handleTxtKGExtraction(value);
  };

  handleTxtKGExtraction(contentValue) {
    const {dispatch} = this.props;
    this.setState({txtKGDic:{"return_code": 500, "return_info": "正在知识抽取中，请稍等...."}})
    dispatch({
      type: 'information/getTxtExtraction',
      payload: contentValue,
      callback: (response) => {
        if (response["return_code"] == 200){
          this.setState({
            txtKGDic: response,
            processNum:0
          });
        }
      },
    });
    clearInterval(this.state.interval);
  }

  modeOnChange = e => {
    this.setState({
      modeValue: e.target.value,
    });
  };

  onChange = (e) => {
    let contentValue = e.target.value
    this.setState({
      searchValue: contentValue,
    });
  };

  transferEntities = (entitiesDic) => {
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };
    let entitiesList = []
    for(let key in entitiesDic){
      if(entitiesDic[key].length>0){
        let entityList = []
        for(let i = 0; i<entitiesDic[key].length; i++){
          entityList.push(<Card.Grid style={gridStyle}>{entitiesDic[key][i]}</Card.Grid>)
        }
        entitiesList.push(<Card title={key}>{entityList}</Card>)
      }
    }

    return entitiesList
  }

  transferTimeLine = (timeLineDic) => {
    let allTimeLineList = []
    for(let key in timeLineDic){
      let timeLineList = []
      for (let i = 0; i < timeLineDic[key].length; i++) {
        timeLineList.push(
          <Timeline.Item key={timeLineDic[key][i][3]} dot={<TagsOutlined style={{ fontSize: '20px' }} />}>
            <p>
              <PushpinTwoTone twoToneColor="#eb2f96" className={styles.icon} />
              {timeLineDic[key][i][3]}
            </p>
            <p>
              <ClockCircleTwoTone twoToneColor="#52c41a" className={styles.icon} />
              {timeLineDic[key][i][0]}
            </p>
            <p>
              <EnvironmentTwoTone twoToneColor="#adc6ff" className={styles.icon} />
              {timeLineDic[key][i][1]}
            </p>
            <Tooltip
              color={'#2db7f5'}
              placement="topLeft"
              arrowPointAtCenter
            >
              <p className={styles.detail}>
                <CloudTwoTone twoToneColor="#87e8de" className={styles.icon} />
                {timeLineDic[key][i][2]}
              </p>
            </Tooltip>
          </Timeline.Item>)
      }
      allTimeLineList.push(<Panel header={key} key={key}>
        <p><Timeline mode={'left'}>{timeLineList}</Timeline></p>
      </Panel>)
    }
    return allTimeLineList
  }

  move = () => {
    if (this.state.txtKGDic.return_code == 500) {
      this.state.interval = setInterval(()=> {
        // fetch('http://gzknowledge.cn:5000/webKG/getProcess',{
        //   methods: 'GET',
        //   headers: { 'Content-Type': 'application/json;charset=utf-8'}
        // }).then(res => res.json()).then(res => this.setState({processNum: res.result}) )
        // if (this.state.txtKGDic.return_code == 200){
        //   clearInterval(this.state.interval);
        // }
        let num = this.state.processNum
        num = parseInt(num + (100-num)/60)
        this.setState({processNum: num})
      }, 1000)
    }
  }

  render() {
    const txtResponse = value => {
      this.setState({searchValue: value})
    }
    const props = {
      name: 'file',
      multiple: true,
      action: 'http://localhost:2525/bookKG/fileUpload',
      onChange(info) {
        if (info.file.response !== "error"){
          txtResponse(info.file.response)
        }
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      },
    };
    return (
      <div className={styles.search}>
        <Row>
          <Col span={10} style={{margin:25}}>
            <Radio.Group defaultValue="input" buttonStyle="solid" onChange={this.modeOnChange}>
              <Radio.Button value="input">输入语料</Radio.Button>
              <Radio.Button value="upload">上传语料</Radio.Button>
            </Radio.Group><br/>
            {this.state.modeValue === "input"?
              <TextArea rows={6} style={{width: 600, height:"60vh", margin: "auto"}}
                        placeholder={'请输入想要进行知识抽取的语料文本'}
                        allowClear
                        onChange={this.onChange}/>:
              <div style={{width: 600, height:500, margin: "auto"}}><Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  目前只支持单文件上传，以最新上传的文件为准，文件格式要求txt~ 上传单个文件后点击“开始知识抽取”按钮即可
                </p>
              </Dragger></div>}<br/>
            <Button
              type="primary"
              className={styles.button}
              size={'large'}
              onClick={() => this.handleSearch(this.state.searchValue)}
            >
              开始知识抽取
            </Button>
          </Col>
          <Col span={12} style={{margin:25}}>
            {this.state.txtKGDic?
              <Tabs defaultActiveKey="table">
                <TabPane tab={<span>TABLE VISON</span>} key="table" style={{height:"60vh",overflow:"auto"}}>
                  <h1>{this.state.txtKGDic.return_info}</h1>
                  {this.state.txtKGDic.result?
                    <div>
                      <Descriptions
                        bordered
                        title="抽取得到的实体"
                      >
                        <div className={styles.jsonBoard}>
                          {this.transferEntities(this.state.txtKGDic.result.entitiesDic)}
                        </div>
                      </Descriptions><br/>
                      {this.transferTimeLine(this.state.txtKGDic.result.personLineDic).length>0?
                        (<Descriptions
                          bordered
                          title="人物时空信息"
                        >
                          <div className={styles.jsonBoard}>
                            <Collapse>
                              {this.transferTimeLine(this.state.txtKGDic.result.personLineDic)}
                            </Collapse>
                          </div>
                        </Descriptions>):null}
                      <br/>
                      {this.transferTimeLine(this.state.txtKGDic.result.eventLineDic).length>0?
                        (<Descriptions
                          bordered
                          title="事件时空信息"
                        >
                          <div className={styles.jsonBoard}>
                            <Collapse>
                              {this.transferTimeLine(this.state.txtKGDic.result.eventLineDic)}
                            </Collapse>
                          </div>
                        </Descriptions>):null}
                      <br/>
                      {this.transferTimeLine(this.state.txtKGDic.result.organizationLineDic).length>0?
                        <Descriptions
                          bordered
                          title="组织时空信息"
                        >
                          <div className={styles.jsonBoard}>
                            <Collapse>
                              {this.transferTimeLine(this.state.txtKGDic.result.organizationLineDic)}
                            </Collapse>
                          </div>
                        </Descriptions>:null}
                      <br/>
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
                  <h1>{this.state.txtKGDic.return_info}</h1>
                  {this.state.txtKGDic.result?
                    <div className={styles.jsonBoard}>
                      {console.log(this.state.txtKGDic.result)}
                      <ReactJson src={this.state.txtKGDic.result} style={{height:"60vh",overflow:"auto"}}/>
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
        </Row>
      </div>
    );
  }
}

export default search;
