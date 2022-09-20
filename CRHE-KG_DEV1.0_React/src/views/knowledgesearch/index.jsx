import React from "react";
import TreeSearch from "./TreeSearch";
import CenterArea from "./CenterArea";
import KnowledgeCard from "./Card";
import {keywordList,attributekList,optionList} from "@/api/knowledgeSearch";
import {Col, Row, Button, Form, Collapse, Select, Spin} from "antd"
import "./index.less";
const { Panel } = Collapse;

class KnowledgeSearch extends React.Component{
    state={
        rData:{"nodes":[],"links": []},
        nodesList:[],
        edgesList:[],
        cardData:[[],[],[],[]],
        parram:"",
        loading: false,
        option_list:[<Select.Option value="孙中山">孙中山</Select.Option>,<Select.Option value="广州起义">广州起义</Select.Option>,<Select.Option value="三元里抗英斗争">三元里抗英斗争</Select.Option>]
    }

    componentDidMount() {
        if(this.state.parram === ""){
            //this.fetchData("广州起义")
        }
    }

    getSpinTrue = () => {
        this.setState({loading:true})
    }

    getSpinFalse = () => {
        this.setState({loading:false})
    }

    getChildrenMsg = (rData,nodesList,edgesList,cardData) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        this.setState({rData,nodesList,edgesList,cardData})
        console.log(rData,nodesList,edgesList,cardData)
    }

    getParram = (parram) => {
        this.fetchData(parram)
    }

    valueChange = (value) => {
        if(value.length>0){
            let parram = value
            this.setState((state) => ({
                parram:parram
            }));
            console.log(this.state.parram)
            if(/[a-z]/i.test(parram)){
                console.log("gg")
            }else{
                optionList(parram).then((response) => {
                    const data =response.data
                    const option_list = []
                    for(let i =0;i<data.length;i++){
                        option_list.push( <Select.Option value={data[i]}>{data[i]}</Select.Option>)

                    }
                    this.setState({option_list:option_list})
                })
            }
        }
    };

    valueSelect = (Option) =>{
        this.setState((state) => ({
            parram:Option
        }));
    }

    fetchData = (value) =>{
        console.log(value)
        this.setState({loading:true})
        keywordList(value).then((response) => {
            const nodesList = []
            const edgesList = []
            const comment = []
            const introduction = []
            const people = []
            const thing = []
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
            attributekList(value).then((res) => {
                if (res.data) {
                    const data =res.data
                    if (nodesList.length!==0){
                        data.nodes.splice(0,2)
                    }else if(nodesList.length ===0) {
                        data.nodes.splice(1,1)
                    }
                    data.nodes.forEach(function (node) {
                        if(node.category=== "事件标识"){
                            rData.nodes.push(node)
                        }
                        if(node.category){
                            nodesList.push(node)
                        }
                    })
                    if(data.links){
                        data.links.forEach(function (text) {
                            if(text.category === "事件标识"){
                                text.value = text.label
                                rData.links.push(text)
                            }
                            if(text.category === 'comment'){
                                comment.push(text.source)
                                comment.push(text.target)
                            }else
                            {
                                introduction.push(text.label + " " + text.target)
                            }

                        })
                        data.links.splice(0,1)
                        data.links.forEach(function (edge) {
                            edge.id = edge.label
                            edge.value = edge.label
                            edgesList.push(edge)
                        })
                    }
                    const cardData=[]
                    cardData.push(comment,introduction,thing,people)
                    this.setState({rData,nodesList,edgesList,cardData});
                    this.setState({loading:false})
                }
            });
        });
    }

    render(){
        return (
            <div className="app-container">
                <br/>
                <br/>
                <br/>
                {/*<div style={{textAlign: 'center'}}>*/}
                {/*    <Form layout="inline">*/}
                {/*        <Form.Item>*/}
                {/*            <Select allowClear={true} showSearch style={{ width: 600,height:40 }} onSearch={this.valueChange} onSelect={this.valueSelect}>*/}
                {/*                {this.state.option_list}*/}
                {/*            </Select>*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item>*/}
                {/*            <Button type="primary" icon="search" onClick={()=>this.fetchData(this.state.parram)}>*/}
                {/*                搜索*/}
                {/*            </Button>*/}
                {/*        </Form.Item>*/}
                {/*    </Form>*/}
                {/*</div>*/}
                <Collapse defaultActiveKey={["1"]}>
                    <Panel header="知识检索" key="1" style={{backgroundColor:"white"}}>
                        <Form layout="inline">
                            <Form.Item label="请输入要检索的知识点:">
                                <Select allowClear={true} showSearch style={{ width: 300 }} onSearch={this.valueChange} onSelect={this.valueSelect}>
                                    {this.state.option_list}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" icon="search" onClick={()=>this.fetchData(this.state.parram)}>
                                    知识检索
                                </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
                <br/>
                <Row gutter={0} className="panel-group">
                    <Col xs={24} sm={24} lg={5} className="card-panel-col" style={{height:720}}>
                        <TreeSearch parent={this}/>
                    </Col>
                    <Col xs={24} sm={24} lg={11} className="center-panel"  style={{height:720}}>
                        {this.state.loading?
                            <div className="spin">
                                <Spin  tip="Loading..." spinning={this.state.loading}/>
                            </div> :
                            <CenterArea parram={this.state.cardData[0][0]} rData={this.state.rData} nodesList={this.state.nodesList} edgesList={this.state.edgesList} parent={this}/>}
                    </Col>
                    <Col xs={24} sm={24} lg={8} className="card-panel-col" style={{height:720}}>
                        <KnowledgeCard cardData={this.state.cardData} rData={this.state.rData}/>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default KnowledgeSearch;
/*
<footer className="footer">
    © 2020 北京师范大学.珠海
</footer>
*/

//<TreeSearch parent={ this }/>