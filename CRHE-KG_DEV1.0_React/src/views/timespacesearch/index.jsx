import React from "react";
import CenterArea from "./CenterArea";
import {Button, Radio, Col, Collapse, Form, Input, Row, Spin} from "antd"
import { timeList,timesList,spaceList,timespaceList,timeCommentList,timesCommentList,spaceCommentList,timespaceCommentList } from "@/api/timespace";
import "./index.less";
import TimeSpaceCard from "./Card";
const { Panel } = Collapse;

class TimeSpacesearch extends React.Component{
    state={
        value1:"",
        value2:"",
        rData:{"nodes":[],"links": []},
        nodesList:[],
        edgesList:[],
        cardData:[[],[]],
        mode:"time",
        loading:false
    }

    componentDidMount() {
        //if(this.state.value === ""){
        //             this.fetchData("")
        //         }
    }

    valueChange1 = (e) => {
        let value = e.target.value
        this.setState((state) => ({
            value1:value
        }));
        console.log(value)
    };

    valueChange2 = (e) => {
        let value = e.target.value
        this.setState((state) => ({
            value2:value
        }));
        console.log(value)
    };

    valueChange3 = (e) => {
        let value = e.target.value
        if(value.includes("年")){
            let splitfirst = value.split('年');
            if(splitfirst[1].includes("月")){
                let splitsecond = splitfirst[1].split('月');
                if(splitsecond[1].includes("日")){
                    if(splitsecond[1].length === 2){
                        splitsecond[1] = "0"+ splitsecond[1]
                    }
                    let splitthird = splitsecond[1].split('日');
                    splitsecond[1] = splitthird.join('');
                    if(splitsecond[0].length === 1){
                        splitsecond[0] = "0"+ splitsecond[0]
                    }
                    splitfirst[1] = splitsecond.join('');
                    value = splitfirst.join('');
                }else{
                    if(splitsecond[0].length === 1){
                        splitsecond[0] = "0"+ splitsecond[0]
                    }
                    splitfirst[1] = splitsecond.join('');
                    splitfirst[1] = splitfirst[1]+"00"
                    value = splitfirst.join('');
                }

            }else{
                value = splitfirst.join('');
                value = value+"0000"
            }
        }
        console.log(value)
        this.setState((state) => ({
            value1:value
        }));
        console.log(value)
    };

    valueChange4 = (e) => {
        let value = e.target.value
        if(value.includes("年")){
            let splitfirst = value.split('年');
            if(splitfirst[1].includes("月")){
                let splitsecond = splitfirst[1].split('月');
                if(splitsecond[1].includes("日")){
                    if(splitsecond[1].length === 2){
                        splitsecond[1] = "0"+ splitsecond[1]
                    }
                    let splitthird = splitsecond[1].split('日');
                    splitsecond[1] = splitthird.join('');
                    if(splitsecond[0].length === 1){
                        splitsecond[0] = "0"+ splitsecond[0]
                    }
                    splitfirst[1] = splitsecond.join('');
                    value = splitfirst.join('');
                }else{
                    if(splitsecond[0].length === 1){
                        splitsecond[0] = "0"+ splitsecond[0]
                    }
                    splitfirst[1] = splitsecond.join('');
                    splitfirst[1] = splitfirst[1]+"00"
                    value = splitfirst.join('');
                }

            }else{
                value = splitfirst.join('');
                value = value+"0000"
            }
        }
        console.log(value)
        this.setState((state) => ({
            value2:value
        }));
        console.log(value)
    };

    handleModeChange = e => {
        const value1 =""
        const value2 =""
        this.setState({ mode: e.target.value });
        this.setState({value1, value2})
    };

    fetchData1 = (value) => {
        this.setState({loading:true})
        timeList(value).then((response) => {
            const nodesList = []
            const edgesList = []
            let comment = []
            const introduction = []
            const rData = {"nodes":[],"links":[]}
            if (response.data) {
                const data =response.data
                data.nodes.forEach(function (node) {
                    rData.nodes.push(node)
                })
                if(data.links) {
                    data.links.forEach(function (edge) {
                        edge.value = edge.label
                        rData.links.push(edge)
                    })
                    data.links.forEach(function (text) {
                        if(text.category === '开始时间'||text.category === '结束时间'||text.category === '出生日期'||text.category === '逝世日期'){
                            introduction.push( text.source +" =>"+ text.label + " " + text.target.substr(1))
                        }
                    })
                }
                timeCommentList(value).then((response) => {
                    if(response.data.length>0){
                        comment = response.data
                        comment.forEach(function (e) {
                            console.log(e)
                            e[1] = e[1].substr(1)
                        })
                    }
                    const cardData=[]
                    cardData.push(comment,introduction)
                    this.setState({rData,nodesList,edgesList,cardData});
                    this.setState({loading:false})
                })
            }
        });
    }

    fetchData2 = (value) => {
        this.setState({loading:true})
        spaceList(value).then((response) => {
            const nodesList = []
            const edgesList = []
            let comment = []
            const introduction = []
            const rData = {"nodes":[],"links":[]}
            if (response.data) {
                const data =response.data
                data.nodes.forEach(function (node) {
                    rData.nodes.push(node)
                })
                if(data.links) {
                    data.links.forEach(function (edge) {
                        edge.value = edge.label
                        rData.links.push(edge)
                    })
                    data.links.forEach(function (text) {
                        if(text.category === '事件地点'||text.category === '地理位置'||text.category === '出生地点'||text.category === '签订地点'){
                                                     introduction.push( text.source +" =>"+text.label + " " + text.target)
                                                 }
                    })
                }
                spaceCommentList(value).then((response) => {
                    if(response.data.length>0){
                        comment = response.data
                        comment.forEach(function (e) {
                            console.log(e)
                            if(e[1].includes("y")){
                                e[1] = e[1].substr(1)
                            }
                        })
                    }
                    const cardData=[]
                    cardData.push(comment,introduction)
                    this.setState({rData,nodesList,edgesList,cardData});
                    this.setState({loading:false})
                })
            }
        });
    }
    //时空
    fetchData3 = (value1,value2) => {
        this.setState({loading:true})
        timespaceList(value1,value2).then((response) => {
            const nodesList = []
            const edgesList = []
            let comment = []
            const introduction = []
            const rData = {"nodes":[],"links":[]}
            if (response.data) {
                const data =response.data
                data.nodes.forEach(function (node) {
                    rData.nodes.push(node)
                })
                if(data.links) {
                    data.links.forEach(function (edge) {
                        edge.value = edge.label
                        rData.links.push(edge)
                    })
                    data.links.forEach(function (text) {
                        if(text.category === '开始时间'||text.category === '结束时间'||text.category === '出生日期'||text.category === '逝世日期'||text.category === '签订时间'){
                            introduction.push( text.source +" =>"+ text.label + " " + text.target.substr(1))
                        }else if(text.category === '事件地点'||text.category === '地理位置'||text.category === '出生地点'||text.category === '签订地点'){
                            introduction.push( text.source +" =>"+ text.label + " " + text.target)
                        }
                    })
                }
                timespaceCommentList(value1,value2).then((response) => {
                    if(response.data.length>0) {
                        comment = response.data
                        comment.forEach(function (e) {
                            e[1] = e[1].substr(1)
                        })
                    }
                        const cardData=[]
                        cardData.push(comment,introduction)
                        this.setState({rData,nodesList,edgesList,cardData});
                        this.setState({loading:false})
                })
            }
        });

    }
    fetchData4 = (value1,value2) => {
        this.setState({loading:true})
        timesList(value1,value2).then((response) => {
            const nodesList = []
            const edgesList = []
            let comment = []
            const introduction = []
            const rData = {"nodes":[],"links":[]}
            if (response.data) {
                const data =response.data
                data.nodes.forEach(function (node) {
                    rData.nodes.push(node)
                })
                if(data.links) {
                    data.links.forEach(function (edge) {
                        edge.value = edge.label
                        rData.links.push(edge)
                    })
                    data.links.forEach(function (text) {
                        if(text.category === '开始时间'||text.category === '结束时间'||text.category === '出生日期'||text.category === '逝世日期' ||text.category === '签订时间'){
                            introduction.push(text.source +" =>"+ text.label + " " + text.target.substr(1))
                        }
                    })
                }
                timesCommentList(value1,value2).then((response) => {
                    if(response.data.length>0){
                        comment = response.data
                        comment.forEach(function (e) {
                            e[1] = e[1].substr(1)
                        })}
                    const cardData=[]
                    cardData.push(comment,introduction)
                    this.setState({rData,nodesList,edgesList,cardData});
                    this.setState({loading:false})
                })
            }
        });
    }


    render(){
        const { mode } = this.state;
        return (
            <div className="app-container">
                <br/>
                <br/>
                <br/>
                <Collapse defaultActiveKey={["1"]}>
                    <Panel header="时空检索" key="1" style={{backgroundColor:"white"}}>
                        <Form layout="inline">
                            <Form.Item>
                                <Radio.Group value={mode} onChange={this.handleModeChange}>
                                    <Radio value="time">时间点</Radio>
                                    <Radio value="times">时间段</Radio>
                                    <Radio value="space">地点</Radio>
                                    <Radio value="timespace">时空</Radio>
                                </Radio.Group>
                            </Form.Item>
                            {mode==="time"?
                                <div>
                                    <Form.Item label="时间点:">
                                        <Input onChange={this.valueChange1} style={{width:400}} placeholder="请检索需要查询的时空实体,例如：1911年4月"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" icon="search" onClick={()=>this.fetchData1(this.state.value1)}>
                                            时空检索
                                        </Button>
                                    </Form.Item>
                                </div>:mode==="times"?<div>
                                    <Form.Item label="">
                                        <Form.Item label="时间段:">
                                            <Input onChange={this.valueChange3} style={{width:150}} placeholder="例如：1940年"/>
                                            &nbsp;&nbsp;~&nbsp;&nbsp;
                                            <Input onChange={this.valueChange4} style={{width:150}} placeholder="例如：1941年"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" icon="search" onClick={()=>this.fetchData4(this.state.value1,this.state.value2)}>
                                                时空检索
                                            </Button>
                                        </Form.Item>
                                    </Form.Item>
                                </div>:mode==="space"?
                                    <div>
                                        <Form.Item label="地点:">
                                            <Input onChange={this.valueChange2} style={{width:400}} placeholder="请检索需要查询的时空实体,例如：广州"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" icon="search" onClick={()=>this.fetchData2(this.state.value2)}>
                                                时空检索
                                            </Button>
                                        </Form.Item>
                                    </div>:<div>
                                        <Form.Item label="时间点:">
                                            <Input onChange={this.valueChange1} style={{width:200}} placeholder="时空实体,例如：1911年4月"/>
                                        </Form.Item>
                                        <Form.Item label="地点:">
                                            <Input onChange={this.valueChange2} style={{width:200}} placeholder="时空实体,例如：广州"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" icon="search" onClick={()=>this.fetchData3(this.state.value1,this.state.value2)}>
                                                时空检索
                                            </Button>
                                        </Form.Item>
                                    </div>}
                        </Form>
                    </Panel>
                </Collapse>
                <br/>
                <div className="center-panel">
                    <Row gutter={0} className="panel-group">
                        <Col xs={24} sm={24} lg={16} className="center-panel" style={{height:700}}>
                            {this.state.loading?
                                <div className="spin">
                                    <Spin  tip="Loading..." spinning={this.state.loading}/>
                                </div> :
                                <CenterArea  rData={this.state.rData} cardData={this.state.cardData} nodesList={this.state.nodesList} edgesList={this.state.edgesList}/>}
                        </Col>
                        <Col xs={24} sm={24} lg={8} className="card-panel-col" style={{height:700}}>
                            <TimeSpaceCard cardData={this.state.cardData}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
};

export default TimeSpacesearch;
/*
<footer className="footer">
    © 2020 北京师范大学.珠海
</footer>
*/