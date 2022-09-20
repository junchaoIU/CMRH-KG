import React from "react";
import CenterArea from "./CenterArea";
import SearchCard from "./Card";
import {Button, Col, Collapse, Form, Input, Row, Spin} from "antd"
import { peopleList} from "@/api/back";
import { keywordList,attributekList } from "@/api/knowledgeSearch";
import "./index.less";
const { Panel } = Collapse;

class Peopleback extends React.Component{
    state={
        value:"",
        centerData:{
            "counties": [],
            "series": []
        },
        cardData:[[],[],[],[]],
        loading:false
    }

    componentDidMount() {
        console.log(this.state.value)
        //if(this.state.value === "") {
        //             console.log(this.state.value)
        //             this.fetchData()
        //         }
    }

    fetchData = () =>{
        this.setState({loading:true})
        peopleList("孙中山").then((res) => {
            const centerData = res.data
            console.log(centerData)
            keywordList("孙中山").then((response) => {
                const comment = []
                const introduction = []
                const people = []
                const thing = []
                if (response.data) {
                    const data = response.data
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
                attributekList("孙中山").then((resz) => {
                    if (resz.data) {
                        const data = resz.data
                        data.links.forEach(function (text) {
                            if (text.category === 'comment') {
                                comment.push(text.source)
                                comment.push(text.target)
                            } else {
                                introduction.push(text.label + " " + text.target)
                            }

                        })
                        const cardData = []
                        cardData.push(comment, introduction, thing, people)
                        this.setState({centerData, cardData});
                        this.setState({loading:false})
                    }
                });
            });
        })
    }

    valueChange = (e) => {
        const value = e.target.value
        this.setState((state) => ({
            value:value
        }));
        console.log(value)
    };

    render(){
        return (
            <div className="app-container">
                    <Collapse defaultActiveKey={["1"]}>
                        <Panel header="人物回溯" key="1" style={{backgroundColor:"white"}}>
                            <Form layout="inline">
                                <Form.Item label="人物实体:">
                                    <Input onChange={this.valueChange}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" icon="search"
                                            onClick={()=>
                                                peopleList(this.state.value).then((res) => {
                                                    this.setState({loading:true})
                                                    const centerData = res.data
                                                    console.log(centerData)
                                                    keywordList(this.state.value).then((response) => {
                                                        const comment = []
                                                        const introduction = []
                                                        const people = []
                                                        const thing = []
                                                        if (response.data) {
                                                            const data =response.data
                                                            if(data.links){
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
                                                        attributekList(this.state.value).then((res) => {
                                                            if (res.data) {
                                                                const data =res.data
                                                                if(data.links){
                                                                    data.links.forEach(function (text) {
                                                                        if(text.category === 'comment'){
                                                                            comment.push(text.source)
                                                                            comment.push(text.target)
                                                                        }else
                                                                        {
                                                                            introduction.push(text.label + " " + text.target)
                                                                        }

                                                                    })
                                                                }
                                                                const cardData=[]
                                                                cardData.push(comment,introduction,thing,people)
                                                                this.setState({centerData,cardData});
                                                                this.setState({loading:false})
                                                            }
                                                        });
                                                    });
                                            })}
                                    >
                                        开始回溯
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Panel>
                    </Collapse>
                <br/>
                    <div className="center-panel">
                        <Row gutter={0} className="panel-group">
                            <Col xs={24} sm={24} lg={17} className="center-panel">
                                {this.state.loading?
                                    <div className="spin">
                                        <Spin  tip="Loading..." spinning={this.state.loading}/>
                                    </div> :
                                    <CenterArea centerData={this.state.centerData}/>}
                            </Col>
                            <Col xs={24} sm={24} lg={7} className="card-panel-col">
                                <SearchCard centerData={this.state.centerData} cardData={this.state.cardData}/>
                            </Col>
                        </Row>
                    </div>
            </div>
        );
    }
};

export default Peopleback;

/*
<footer className="footer">
    © 2020 北京师范大学.珠海
</footer>
*/
