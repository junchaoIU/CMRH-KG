import React, { Component } from "react";
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import Area from "./Area";
// import Thing from "./Thing"
import Book from "./Book"
import CountUp from "react-countup";
import {countList} from "@/api/dashboard"
import "../../assets/iconfont/iconfont.css"
import 'rc-banner-anim/assets/index.css';
// import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import "./index.less";
import {Tabs} from "antd";
import { Row,Col,Card,Avatar,BackTop} from 'antd';
// import steps from "./steps";
import schoolStone from '../../assets/images/schoolStone.jpg';
import banner01 from '../../assets/images/banner01.jpg';
const { Meta } = Card;
const { TabPane } = Tabs;

/*
*<TypingCard source={cardContent}/>
                <Button type="primary" onClick={guide} style={{float:"right"}}>
                    打开引导
                </Button>*/


// const cardContent = `
//     PS：第一次使用该系统，可点击下方新手引导了解一些小细节喔~
//   `
// const driver = new Driver({
//     animate: true, // 在更改突出显示的元素时是否设置动画，
//     // 当header的position为fixed时，会覆盖元素，这是driver.js的bug，
//     // 详细内容见https://github.com/kamranahmedse/driver.js/issues/97
//     opacity: 0.75, // 背景不透明度（0表示只有弹出窗口，没有覆盖）
//     doneBtnText: "完成", // 最后一个按钮上的文本
//     closeBtnText: "关闭", // 此步骤的“关闭”按钮上的文本
//     nextBtnText: "下一步", // 此步骤的下一步按钮文本
//     prevBtnText: "上一步", // 此步骤的上一个按钮文本
// });

const BgElement = Element.BgElement;

class Dashboard extends Component{
    state={
        countList:{
            "books": 0,
            "individual": 0,
            "dataProperty": 0,
            "statement": 0,
            "objectProperty": 0
        }
    }

    componentDidMount() {
        countList().then((res)=>{
            console.log(res.data)
            this.setState({countList:res.data})
        })
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <BannerAnim prefixCls="banner-user" autoPlay>
                    <Element
                        prefixCls="banner-user-elem"
                        key="0"
                    >
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                background: '#364D79',
                            }}
                        />
                        <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                            欢迎来到广州革命历史数字图书馆
                        </TweenOne>
                        <TweenOne className="banner-user-text"
                                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                        >
                            Welcome to the Knowledge Mapping System of Guangzhou Revolutionary historical Events
                        </TweenOne>
                    </Element>
                    <Element>
                        <img
                            src={banner01 }
                            style={{
                                width:"100%"
                            }}
                            alt="暂无图片"
                        />
                    </Element>
                    <Element
                        prefixCls="banner-user-elem"
                        key="1"
                    >
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                background: '#64CBCC',
                            }}
                        />
                        <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                            欢迎来到广州革命历史数字图书馆
                        </TweenOne>
                        <TweenOne className="banner-user-text"
                                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                        >
                            Welcome to the Knowledge Mapping System of Guangzhou Revolutionary historical Events
                        </TweenOne>
                    </Element>
                    <Element>
                        <img
                            src={schoolStone}
                            style={{
                                width:"100%"
                            }}
                            alt="暂无图片"
                        />
                    </Element>
                </BannerAnim>
                <Card
                    //style={{height:1723}}
                >
                    <Meta
                        avatar={<Avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1615873983,11197073&fm=26&gp=0.jpg" />}
                        title="欢迎来到广州革命历史数字图书馆"
                    />
                    <h3>本系统为广州革命历史事件相关数字信息资源库，具体功能介绍如下:</h3>
                    <Tabs defaultActiveKey="1" style={{textAlign: 'center'}}>
                        <TabPane tab="本体知识库" key="1" style={{textAlign: 'center'}}>
                            <Row style={{background: "#fff",padding: 20}}>
                                <Col span={2}>

                                </Col>
                                <Col span={4}>
                                    <Card style={{background: "#fff",marginRight:20}}>
                                        <p>知识实体数量</p>
                                        <CountUp end={this.state.countList.individual} start={0} style={{fontSize:20,textAlign: 'center',color: '#3f8600'}}/>
                                    </Card>
                                </Col>
                                <Col span={4}>
                                    <Card style={{background: "#fff",marginRight:20}}>
                                        <p>三元组数量</p>
                                        <CountUp end={this.state.countList.statement} start={0} style={{fontSize:20,textAlign: 'center',color: '#3f8600'}}/>
                                    </Card>
                                </Col>
                                <Col span={4}>
                                    <Card style={{background: "#fff",marginRight:20}}>
                                        <p>关系种类数量</p>
                                        <CountUp end={this.state.countList.objectProperty} start={0} style={{fontSize:20,textAlign: 'center',color: '#3f8600'}}/>
                                    </Card>
                                </Col>
                                <Col span={4}>
                                    <Card style={{background: "#fff",marginRight:20}}>
                                        <p>属性种类数量</p>
                                        <CountUp end={this.state.countList.dataProperty} start={0} style={{fontSize:20,textAlign: 'center',color: '#3f8600'}}/>
                                    </Card>
                                </Col>
                                <Col span={4}>
                                    <Card style={{background: "#fff",marginRight:20}}>
                                        <p>文献语料数量</p>
                                        <CountUp end={this.state.countList.books} start={0} style={{fontSize:20,textAlign: 'center',color: '#3f8600'}}/>
                                    </Card>
                                </Col>
                                <Col span={2}>

                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                    <Tabs defaultActiveKey="1" style={{textAlign: 'center'}}>
                        <TabPane tab="数字服务" key="1" style={{textAlign: 'center'}}>
                            <Row gutter={40} className="panel-group" style={{height:300}}>
                                <Col
                                    lg={3}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                />
                                <Col
                                    lg={6}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                >
                                    <Card title="知识检索" hoverable extra={<a href="#/knowledgesearch">开始使用</a>} style={{height:300}} className="card-panel-col-block">
                                        <div className="icon">
                                            <span className="iconfont" style={{ fontSize: '30px', color: '#08c'}}>&#xe602;</span>
                                        </div>
                                        <p>数据结构化是人文知识扩展的必经之路。本平台提供实体目录支持系统结构化存储的所有实体的查看，涵盖多个实体分类，用户可通过点击目录上的加减号来展开、收起，进行系统存储实体的了解。也可以在目录上方的检索栏中输入自己感兴趣的实体，进行相关实体知识检索、知识图谱的查看、实体知识的了解。</p>
                                    </Card>
                                </Col>
                                <Col
                                    lg={6}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                >
                                    <Card title="时空检索" hoverable extra={<a href="#/timespacesearch">开始使用</a>} style={{height:300}} className="card-panel-col-block">
                                        <div className="icon">
                                            <span className="iconfont" style={{ fontSize: '30px', color: '#08c'}}>&#xe6df;</span>
                                        </div>
                                        <p>时空检索基于事件回溯和人物回溯实体的时空数据，可以帮助人们进一步探索某个时间点或地点发生的事情。用户可以通过对检索想要了解的时间点和地点来了解该时空发生的事情，通过不同的检索组合将零碎的回溯实体拼接成不同的时间线，以全方面还原大家感兴趣的时空历史片段。</p>
                                    </Card>
                                </Col>
                                <Col
                                    lg={6}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                >
                                    <Card title="关系检索" hoverable extra={<a href="#/relationsearch">开始使用</a>} style={{height:300}} className="card-panel-col-block">
                                        <div className="icon">
                                            <span className="iconfont" style={{ fontSize: '30px', color: '#08c'}}>&#xe680;</span>
                                        </div>
                                        <p>知识关系检索是基于知识结构化拓展出来的功能，可以帮助人们进一步探索不同知识间的深层关系。本平台支持任意两个实体之间的关系检索，进行任意两点间关系的探索。用户可以通过对不同实体知识的检索来探索两点间的共指知识信息，通过可视化的方法进一步构建两个实体的数据结构体系。</p>
                                    </Card>
                                </Col>
                                <Col
                                    lg={3}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                />
                            </Row>
                            <Row gutter={40} className="panel-group" style={{height:300}}>
                                <Col
                                    lg={3}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                />
                                <Col
                                    lg={6}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                >
                                    <Card title="人物回溯" hoverable extra={<a href="#/peopleback">开始使用</a>} style={{height:300}} className="card-panel-col-block">
                                        <div className="icon">
                                            <span className="iconfont" style={{ fontSize: '30px', color: '#08c'}}>&#xe66d;</span>
                                        </div>
                                        <p>人物回溯分析基于对不同人物实体的数据收集，通过数据结构化建立的知识线网络。本平台支持对人物实体的时间地点发展历程的知识图谱二维演化，通过对人物实体一生的还原与再现，为读者建立起一个人物知识的立体知识体系。在检索框中检索我们所想回溯的人物实体点击检索，即可进行人物——时间地点历程二维演化。</p>
                                    </Card>
                                </Col>
                                <Col
                                    lg={6}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                >
                                    <Card title="事件回溯" hoverable extra={<a href="#/thingback">开始使用</a>} style={{height:300}} className="card-panel-col-block">
                                        <div className="icon">
                                            <span className="iconfont" style={{ fontSize: '30px', color: '#08c'}}>&#xe600;</span>
                                        </div>
                                        <p>事件回溯分析基于对革命历史时间线的构建以及不同事件实体的数据收集，根据W3C在语义网中定义的n关系表现形式模式1和模式2建立的知识线网络。本平台支持对事件实体的时间地点发展历程的知识图谱二维演化，对事件实体全过程进行还原与再现。在检索框中检索我们所想回溯的事件实体点击检索，即可进行事件——时间地点历程二维演化。</p>
                                    </Card>
                                </Col>
                                <Col
                                    lg={6}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                >
                                    <Card title="语料回溯" hoverable extra={<a href="#/textback">开始使用</a>} style={{height:300}} className="card-panel-col-block">
                                        <div className="icon">
                                            <span className="iconfont" style={{ fontSize: '30px', color: '#08c'}}>&#xe624;</span>
                                        </div>
                                        <p>语料回溯分析基于本平台抽取实体所用的主要语料构建的小型语料库，用户可检索想要了解的实体、三元组或者多个实体间的一些文字记载，通过lucene全文检索技术，提取出语料库中关系系数排名前十的语段进行展示。</p>
                                    </Card>
                                </Col>
                                <Col
                                    lg={3}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                />
                            </Row>
                        </TabPane>
                    </Tabs>
                    <Tabs defaultActiveKey="1" style={{textAlign: 'center'}}>
                        <TabPane tab="数字媒体" key="1" style={{textAlign: 'center'}}>
                            <Row gutter={40} className="panel-group">
                                <Col
                                    lg={16}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                >
                                    <Area/>
                                    {/*<Thing/>*/}
                                    此处内容重构中....
                                    暂无内容
                                </Col>
                                <Col
                                    lg={8}
                                    sm={12}
                                    xs={12}
                                    className="card-panel-col"
                                >
                                    <Book/>
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Card>
                {/*<footer className="footer">*/}
                {/*    Copyright©2020 北京师范大学珠海分校管理学院 版权所有<br/>*/}
                {/*    <a href="http://beian.miit.gov.cn/">粤ICP备2020089302号-1</a>*/}
                {/*</footer>*/}
                <BackTop/>
            </div>
        );
    }
}

export default Dashboard;
/*
<footer className="footer">
    © 2020 北京师范大学.珠海
</footer>
*/
