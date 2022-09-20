import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Banner from '@/pages/About/components/Banner'
import {Card, Col, Row, Avatar} from "antd";
const { Meta } = Card;

class about extends Component {

  render() {
    return (
      <div>
        <Banner/>
        <PageContainer>
          <center>
            <Card title="团队介绍" bordered={true} style={{ width:"100%" }}>
              <p>Hi, This is Canton Knowledge Graph Development Team, from Beijing Normal University, Zhuhai. </p>
              <p>目前，我们专注于中国近代革命历史时空知识图谱构建、管理以及应用理论与方法研究。</p>
              <p>包括但不限于：革命历史文献的知识化和开发利用、历史时空信息的组织与检索、历史领域知识库问答等。</p>
              <p>同时，我们致力于本体体系知识图谱的高效构建方法探索，包括本体建模工具Protege的开源Python操作库Auto_Protege的开发。</p>
            </Card>
            <Card title="团队成员" bordered={true} style={{ width:"100%", paddingLeft:100, paddingRight:100, paddingTop:20}}>
              <Row>
                <Col span={12}>
                  <Card title="Tutor&Scientist" bordered={false} hoverable={true} extra={<a href="https://rsgyy.bnu.edu.cn/yjjg/glcxyjzx/glcxyjzxrcdw/97671.html">More</a>} style={{margin:20}}>
                    <Meta
                      avatar={<Avatar size={80} src={require('../../assets/memberPhoto/JiangYing.jpg')} />}
                      title="Prof. JIANG,Ying"
                      description="Professor, Doctoral supervisor（jpz6311whu@bnu.edu.cn）"
                    />
                    The main research interests are natural language processing, corpus linguistics, text proofreading, information management, knowledge graph and big data, etc.
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Tutor&Scientist" bordered={false} hoverable={true} extra={<a href="https://rsgyy.bnu.edu.cn/yjjg/yykxyjzx/rcdw2/97903.html">More</a>} style={{margin:20}}>
                    <Meta
                      avatar={<Avatar size={80} src={require('../../assets/memberPhoto/Yangjing.jpg')} />}
                      title="Dr. YANG,Jing"
                      description="Assistant Professor（jingyang@bnu.edu.cn）"
                    />
                    The main research interests are neural networks, natural language processing, data mining, etc.
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Lead Investigator" bordered={false} hoverable={true} extra={<a href="https://github.com/junchaoIU">More</a>} style={{margin:20}}>
                    <Meta
                      avatar={<Avatar size={80} src={require('../../assets/memberPhoto/Junchao.jpg')} />}
                      title="WU Junchao"
                      description="Responsible for research control, experimental design, full-stack development and knowledge engineering reconstruction（wujunchaoIU@outlook.com）"
                    />
                    The main Research interests are natural language processing, information organization and retrieval, knowledge graph and cognitive intelligence
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Assistant Investigator" bordered={false} hoverable={true} extra={<a href="#">More</a>} style={{margin:20}}>
                    <Meta
                      avatar={<Avatar size={80} src={require('../../assets/memberPhoto/Chenxin.jpg')} />}
                      title="Chen Xin"
                      description="Responsible for back-end development and maintenance(ChenXinV@outlook.com)"
                    />
                    The main research interests are NLP and DA, integrating the finance on the future direction.
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Assistant Investigator" bordered={false} hoverable={true} extra={<a href="#">More</a>} style={{margin:20}}>
                    <Meta
                      avatar={<Avatar size={80} src={require('../../assets/memberPhoto/Lingyu.jpg')} />}
                      title="Guo Lingyu"
                      description="Responsible for knowledge engineering and data engineering(m15989724148@163.com)"
                    />
                    The main research interests are knowledge graph and knowledge engineering; Research on user profile and its application; Social media data mining.
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Development Engineer" bordered={false} hoverable={true} extra={<a href="#">More</a>} style={{margin:20}}>
                    <Meta
                      avatar={<Avatar size={80} src={require('../../assets/memberPhoto/Jiaxuan.jpg')} />}
                      title="Chen Jiaxuan"
                      description="Responsible for front-end DEV2.0 development"
                    />
                    Focus on Information visualization and front-end engineering.
                  </Card>
                </Col>
              </Row>
            </Card>
          </center>

        </PageContainer>
      </div>
    );
  }
}
export default about;
