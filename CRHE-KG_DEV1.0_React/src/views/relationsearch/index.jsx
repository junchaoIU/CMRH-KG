import React from "react";
import CenterArea from "./CenterArea";
import SearchCard from "./Card";
import {Button, Col, Collapse, Form, Input, Row, Spin,Icon} from "antd"
import { relationResult} from "@/api/relationSearch";
import {luceneList} from "@/api/lucene";
import { keywordList,attributekList } from "@/api/knowledgeSearch";
import "./index.less";
const { Panel } = Collapse;

class Relationsearch extends React.Component{
    state={
        value1:"",
        value2:"",
        realationshipData:[],
        rData1:{"nodes": [], "links": []},
        nodesList1:[],
        edgesList1:[],
        cardData1:[[],[],[],[]],
        nodesList2:[],
        edgesList2:[],
        cardData2:[[],[],[],[]],
        abluceneData:[[],[],[]],
        loading:false
    }

    componentDidMount() {
        //if(this.state.value1 === "" && this.state.value2 === ""){
        //             this.fetchData("孙中山","辛亥革命")
        //         }
    }

    value1Change = (e) => {
        let value = e.target.value
        this.setState((state) => ({
            value1:value
        }));
        console.log(value)
    };

    value2Change = (e) => {
        let value = e.target.value
        this.setState((state) => ({
            value2:value
        }));
        console.log(value)
    };

    fetchData = (value1,value2) => {
        this.setState({loading:true})
        relationResult(value1, value2).then((res) => {
            const realationshipData = []
            let relation1 = null
            let relation2 = null
            let grouptitle = '未找到两个知识点间的关系！'
            switch (res.data.length) {
                case 0:{
                    relation1 = null
                    relation2 = null
                    grouptitle = '未找到两个知识点间的关系！'
                    realationshipData.push(value1,value2,relation1,relation2,grouptitle)
                    this.setState({realationshipData})
                    break;
                }
                case 1:{
                    relation1 = res.data[0].subject + '的' + res.data[0].predicate + '是' + res.data[0].object
                    relation2 = null
                    grouptitle = '两个知识点间有关系!'
                    realationshipData.push(value1,value2,relation1,relation2,grouptitle)
                    this.setState({realationshipData})
                    break;
                }
                case 2:{
                    relation1 = res.data[0].subject + '的' + res.data[0].predicate + '是' + res.data[0].object
                    relation2 = res.data[1].subject + '的' + res.data[1].predicate + '是' + res.data[1].object
                    grouptitle = '两个知识点间有关系!'
                    realationshipData.push(value1,value2,relation1,relation2,grouptitle)
                    this.setState({realationshipData})
                    break;
                }
                default:
                    break;
            }
        })
        keywordList(value1).then((response) => {
            const nodesList1 = []
            const edgesList1 = []
            const comment = []
            const introduction = []
            const people = []
            const thing = []
            const rData1 = {"nodes": [], "links": []}
            if (response.data) {
                const data = response.data
                data.nodes.forEach(function (node) {
                    rData1.nodes.push(node)
                })
                if(data.links) {
                    data.links.forEach(function (edge) {
                        edge.value = edge.label
                        rData1.links.push(edge)
                    })
                    data.links.forEach(function (text) {
                        if (text.category === '相关事件') {
                            thing.push(text.target)
                        } else if(text.category === '相关遗存' || text.category === '事件地点' ||text.category === '地理位置'||text.category === '出生地点'||text.category === '签订地点'){
                            introduction.push(text.label + " " + text.target)
                        } else if(text.category === '开始时间'||text.category === '结束时间'||text.category === '出生日期'||text.category === '逝世日期'||text.category === '签订时间'){
                            introduction.push(text.label + " " + text.target.substr(1))
                        } else {
                            people.push(text.label + " " + text.target)
                        }
                    })
                }
            }
            attributekList(value1).then((res) => {
                if (res.data) {
                    const data = res.data
                    if (nodesList1.length !== 0) {
                        data.nodes.splice(0, 2)
                    } else if (nodesList1.length === 0) {
                        data.nodes.splice(1, 1)
                    }
                    data.nodes.forEach(function (node) {
                        if(node.category=== "label"){
                            rData1.nodes.push(node)
                        }
                        if(node.category){
                            nodesList1.push(node)
                        }
                    })
                    data.links.forEach(function (text) {
                        if(text.category === "label"){
                            rData1.links.push(text)
                        }
                        if (text.category === 'comment') {
                            comment.push(text.source)
                            comment.push(text.target)
                        } else {
                            introduction.push(text.label + " " + text.target)
                        }

                    })
                    data.links.splice(0, 1)
                    data.links.forEach(function (edge) {
                        edge.id = edge.label
                        edge.value = edge.label
                        edgesList1.push(edge)
                    })
                    const cardData1 = []
                    console.log(nodesList1)
                    console.log(edgesList1)
                    cardData1.push(comment, introduction, thing, people)
                    keywordList(value2).then((response) => {
                        const nodesList2 = []
                        const edgesList2 = []
                        const comment = []
                        const introduction = []
                        const people = []
                        const thing = []
                        if (response.data) {
                            const data = response.data
                            const exist_nodes = []
                            rData1.nodes.forEach(function (node) {
                                exist_nodes.push(node.id)
                            })
                            data.nodes.forEach(function (node) {
                                if(!exist_nodes.includes(node.id)){
                                    rData1.nodes.push(node)
                                }
                            })
                            if(data.links){
                                data.links.forEach(function (edge) {
                                    edge.value = edge.label
                                    rData1.links.push(edge)
                                })
                                data.links.forEach(function (text) {
                                    if (text.category === '相关事件') {
                                        thing.push(text.target)
                                    } else if(text.category === '相关遗存' || text.category === '事件地点' ||text.category === '地理位置'||text.category === '出生地点'||text.category === '签订地点'){
                                        introduction.push(text.label + " " + text.target)
                                    } else if(text.category === '开始时间'||text.category === '结束时间'||text.category === '出生日期'||text.category === '逝世日期'||text.category === '签订时间'){
                                        introduction.push(text.label + " " + text.target.substr(1))
                                    } else {
                                        people.push(text.label + " " + text.target)
                                    }
                                })
                            }
                        }
                        attributekList(value2).then((res) => {
                            if (res.data) {
                                const data = res.data
                                if (nodesList2.length !== 0) {
                                    data.nodes.splice(0, 2)
                                } else if (nodesList2.length === 0) {
                                    data.nodes.splice(1, 1)
                                }
                                data.nodes.forEach(function (node) {
                                    if(node.category=== "事件标识"){
                                        rData1.nodes.push(node)
                                    }
                                    if (node.category) {
                                        nodesList2.push(node)
                                    }
                                })
                                const sameIntroduction = []
                                if(data.links){
                                    data.links.forEach(function (text) {
                                        if(text.category=== "事件标识"){
                                            text.value = text.label
                                            rData1.links.push(text)
                                        }
                                        if (text.category === 'comment') {
                                            comment.push(text.source)
                                            comment.push(text.target)
                                        } else {
                                            introduction.push(text.label + " " + text.target)
                                        }
                                    })
                                    console.log(sameIntroduction)
                                    data.links.splice(0, 1)
                                    data.links.forEach(function (edge) {
                                        edgesList2.push(edge)
                                    })
                                }
                                const cardData2 = []
                                console.log(nodesList2)
                                console.log(edgesList2)
                                cardData2.push(comment, introduction, thing, people)
                                console.log(rData1)
                                this.setState({rData1, nodesList1, edgesList1, cardData1, nodesList2, edgesList2, cardData2});
                                luceneList(value1+value2).then((response) => {
                                    let num = ""
                                    if (response.data.length>0){
                                        num = response.data[0].num
                                    }else{
                                        num = "未检索到相关内容！"
                                    }
                                    const filename = []
                                    const content = []
                                    const abluceneData = []
                                    response.data.forEach(function (file) {
                                        filename.push(file.fileName)
                                        content.push(file.content)
                                    })
                                    abluceneData.push(num,filename,content)
                                    this.setState({ abluceneData });
                                    this.setState({loading:false})
                                });
                            }
                        });
                    })
                }
            });
        })
    }


    render(){
        return (
            <div className="app-container">
                <br/>
                <br/>
                <br/>
                <Collapse defaultActiveKey={["1"]}>
                    <Panel header="关系检索" key="1" style={{backgroundColor:"white"}}>
                        <Form layout="inline">
                            <Form.Item label="知识点一:">
                                <Input onChange={this.value1Change}/>
                            </Form.Item>
                            <Form.Item>
                                <Icon type="close" />
                            </Form.Item>
                            <Form.Item label="知识点二:">
                                <Input onChange={this.value2Change} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" icon="search" onClick={()=>this.fetchData(this.state.value1,this.state.value2)}>
                                    关系检索
                                </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
                <br/>
                <div className="center-panel">
                    <Row gutter={0} className="panel-group">
                        <Col xs={24} sm={24} lg={15} className="center-panel" style={{height:700}}>
                            {this.state.loading?
                                <div className="spin">
                                    <Spin  tip="Loading..." spinning={this.state.loading}/>
                                </div> :
                                <CenterArea rData={this.state.rData1} realationshipData={this.state.realationshipData}/>}

                        </Col>
                        <Col xs={24} sm={24} lg={9} className="card-panel-col" style={{height:700}}>
                            <SearchCard abluceneData={this.state.abluceneData} cardData1={this.state.cardData1} cardData2={this.state.cardData2}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
};

export default Relationsearch;
/*
*<footer className="footer">
    © 2020 北京师范大学.珠海
</footer>
*/
