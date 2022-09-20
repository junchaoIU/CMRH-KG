import React from 'react';
import { BackTop,Modal,Row,Col,Anchor } from 'antd';
import doc1 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0001.jpg"
import doc2 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0002.jpg"
import doc3 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0003.jpg"
import doc4 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0004.jpg"
import doc5 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0005.jpg"
import doc6 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0006.jpg"
import doc7 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0007.jpg"
import doc8 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0008.jpg"
import doc9 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0009.jpg"
import doc10 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0010.jpg"
import doc11 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0011.jpg"
import doc12 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0012.jpg"
import doc13 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0013.jpg"
import doc14 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0014.jpg"
import doc15 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0015.jpg"
import doc16 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0016.jpg"
import doc17 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0017.jpg"
import doc18 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0018.jpg"
import doc19 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0019.jpg"
import doc20 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0020.jpg"
import doc21 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0021.jpg"
import doc22 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0022.jpg"
import doc23 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0023.jpg"
import doc24 from "../../assets/images/广州革命历史事件知识图谱系统使用手册/0024.jpg"

const { Link } = Anchor;

class Doc extends React.Component {
  state={visible: false}

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.showModal()
  }
  photos =()=> {
    const photoList = []
    photoList.push(<div id="first"><img src={doc1} style={{width:"100%"}}></img></div>)
    photoList.push(<div id="second"><img src={doc2} style={{width:"100%"}}></img><img src={doc3} style={{width:"100%"}}></img></div>)
    photoList.push(
      <div id="third">
        <div id="third1">
          <img src={doc4} style={{width:"100%"}}></img>
          <img src={doc5} style={{width:"100%"}}></img>
        </div>
        <div id="third2">
          <img src={doc6} style={{width:"100%"}}></img>
        </div>
        <div id="third3">
          <img src={doc7} style={{width:"100%"}}></img>
        </div>
        <div id="third4">
          <img src={doc8} style={{width:"100%"}}></img>
          <img src={doc9} style={{width:"100%"}}></img>
          <img src={doc10} style={{width:"100%"}}></img>
          <img src={doc11} style={{width:"100%"}}></img>
        </div>
        <div id="third5">
          <img src={doc12} style={{width:"100%"}}></img>
          <img src={doc13} style={{width:"100%"}}></img>
        </div>
        <div id="third6">
          <img src={doc14} style={{width:"100%"}}></img>
        </div>
        <div id="third7">
          <img src={doc15} style={{width:"100%"}}></img>
        </div>
        <div id="third8">
          <img src={doc16} style={{width:"100%"}}></img>
        </div>
      </div>)
    photoList.push(
      <div id="forth">
        <div id="forth1">
          <img src={doc17} style={{width:"100%"}}></img>
          <img src={doc18} style={{width:"100%"}}></img>
        </div>
        <div id="forth2">
          <img src={doc19} style={{width:"100%"}}></img>
        </div>
        <div id="forth3">
          <img src={doc20} style={{width:"100%"}}></img>
        </div>
        <div id="forth4">
          <img src={doc21} style={{width:"100%"}}></img>
        </div>
        <div id="forth5">
          <img src={doc22} style={{width:"100%"}}></img>
        </div>
        <div id="forth6">
          <img src={doc23} style={{width:"100%"}}></img>
          <img src={doc24} style={{width:"100%"}}></img>
        </div>
      </div>)
    return (photoList)
  }
  render() {
    return (
      <div className="app-container">
        <br/>
        <br/>
        <br/>
        <Modal
            title="使用须知"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
          <p>欢迎使用广州革命历史数字图书馆</p>
          <p>目前系统的使用文档未进行网页排版，本页面为图片格式版本</p>
          <p>由于图片格式问题，通过右侧的目录导航到达的位置只能到达标题所在的图片，即标题附近，无法准确定位，望悉知！</p>
        </Modal>
        <div>
          <BackTop />
        </div>
        <Row>
          <Col span={20}>
            <center>
              <div style={{width:"90%"}}>
                {this.photos()}
                {/*<Markdown/>*/}
              </div>
            </center>
          </Col>
          <Col span={4}>
            <Anchor style={{margin:"70px"}}>
              <Link href={window.location.hash+"#first"} title="系统使用手册" />
              <Link href={window.location.hash+"#second"} title="系统配置要求" />
              <Link href={window.location.hash+"#second"} title="系统部署" />
              <Link href={window.location.hash+"#third"} title="功能介绍及使用">
                <Link href={window.location.hash+"#third1"} title="知识库展示查询" />
                <Link href={window.location.hash+"#third2"} title="知识检索" />
                <Link href={window.location.hash+"#third3"} title="关系检索" />
                <Link href={window.location.hash+"#third4"} title="时空检索" />
                <Link href={window.location.hash+"#third5"} title="人物回溯" />
                <Link href={window.location.hash+"#third6"} title="事件回溯" />
                <Link href={window.location.hash+"#third7"} title="语料回溯" />
                <Link href={window.location.hash+"#third8"} title="数据管理" />
              </Link>
              <Link href={window.location.hash+"#forth"} title="附录">
                <Link href={window.location.hash+"#forth1"} title="本体知识库构建" />
                <Link href={window.location.hash+"#forth2"} title="数据采集与收录情况" />
                <Link href={window.location.hash+"#forth3"} title="时空检索知识原理" />
                <Link href={window.location.hash+"#forth4"} title="文献语料检索原理" />
                <Link href={window.location.hash+"#forth5"} title="系统相关技术选型" />
                <Link href={window.location.hash+"#forth6"} title="可视化图表说明" />
              </Link>
            </Anchor>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Doc;