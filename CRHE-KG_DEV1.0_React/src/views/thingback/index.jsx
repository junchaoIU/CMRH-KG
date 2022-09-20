import React from "react";
import CenterArea from "./CenterArea";
import SearchCard from "./Card";
import { ThingLine,ThingList} from "@/api/back";
import { keywordList,attributekList } from "@/api/knowledgeSearch";
import {Button, Col, Collapse, Form, Input, Row, Spin, Steps} from "antd"


import "./index.less";
const { Panel } = Collapse;
const { Step } = Steps;

class Thingback extends React.Component{
    state={
        value:"",
        List:[],
        centerData:{
            "counties": [],
            "series": []
        },
        cardData:[[],[],[],[]],
        loading:false
    }

    componentDidMount() {
        this.getList()
    }

    getList = () => {
        ThingLine().then((res) => {
            const List =[]
            const data = res.data
            for(let i=0;i<data.length; i++){
                List.push(
                    <Step
                        title={data[i].title}
                        subTitle={data[i].time.substr(1)}
                        description={data[i].location}
                        style={{width:400}}
                    />
                )
            }
            this.setState({List})
            if(this.state.value === ""){
                this.onChange(0)
            }
        })
    }


    onChange = current => {
        this.setState({loading:true})
        console.log('onChange:', current);
        this.setState({ current });
        ThingList(this.state.List[current].props.title).then((res) => {
            const centerData = res.data
            keywordList(this.state.List[current].props.title).then((response) => {
                console.log(response.data)
                const comment = []
                const introduction = []
                const people = []
                const thing = []
                if (response.data) {
                    const data =response.data
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
                attributekList(this.state.List[current].props.title).then((res) => {
                    if (res.data) {
                        const data =res.data
                        data.links.forEach(function (text) {
                            if(text.category === 'comment'){
                                comment.push(text.source)
                                comment.push(text.target)
                            }else
                            {
                                introduction.push(text.label + " " + text.target)
                            }

                        })
                        const cardData=[]
                        cardData.push(comment,introduction,thing,people)
                        this.setState({centerData,cardData});
                        this.setState({loading:false})
                    }
                });
            });
        })
    };

    fetchData = () => {
    };

    valueChange = (e) => {
        let value = e.target.value
        this.setState((state) => ({
            value:value
        }));
    };



    render(){
        const { current } = this.state;
        return (
            <div className="app-container">
                    <Collapse defaultActiveKey={["1"]}>
                        <Panel header="事件回溯" key="1" style={{backgroundColor:"white"}}>
                            <Form layout="inline">
                                <Form.Item label="事件实体:">
                                    <Input onChange={this.valueChange}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" icon="search"
                                            onClick={()=>
                                                ThingList(this.state.value).then((res) => {
                                                    this.setState({loading:true})
                                                    const centerData = res.data
                                                    keywordList(this.state.value).then((response) => {
                                                        const comment = []
                                                        const introduction = []
                                                        const people = []
                                                        const thing = []
                                                        if (response.data) {
                                                            const data =response.data
                                                            console.log(response.data)
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
                                                        attributekList(this.state.value).then((res) => {
                                                            if (res.data) {
                                                                const data =res.data
                                                                data.links.forEach(function (text) {
                                                                    if(text.category === 'comment'){
                                                                        comment.push(text.source)
                                                                        comment.push(text.target)
                                                                    }else
                                                                    {
                                                                        introduction.push(text.label + " " + text.target)
                                                                    }

                                                                })
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
                <Steps
                    className="step"
                    progressDot
                    current={current}
                    onChange={this.onChange}
                    style={{overflow:"auto"}}
                >
                    {this.state.List}
                </Steps>
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

export default Thingback;
/*
<footer className="footer">
    © 2020 北京师范大学.珠海
</footer>
*/
