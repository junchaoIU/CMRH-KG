import React from "react";
import TypingCard from "@/components/TypingCard";
import { Card ,Row,Col,Avatar} from 'antd';
import "./index.less";
const { Meta } = Card;

const About = () => {
  const cardContent = `
    <p>本系统系北京师范大学珠海分校管理学院广州革命历史事件知识图谱构建与可视化项目团队设计开发</p>
  `;
  return (
    <div className="app-container">
      <TypingCard title="关于作者" source={cardContent}/>
      <div className="site-card-border-less-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <Card  style={{ height: 300 }} bordered={false} hoverable>
              <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="指导老师 姜赢"
              >
              </Meta>
            </Card>
          </Col>
          <Col span={6}>
            <Card  style={{ height: 300 }} bordered={false} hoverable>
              <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="项目负责人 吴俊潮"
              >
              </Meta>
            </Card>
          </Col>
          <Col span={6}>
            <Card  style={{ height: 300 }} bordered={false} hoverable>
              <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="项目组成员 陈鑫"
              >
              </Meta>
            </Card>
          </Col>
          <Col span={6}>
            <Card  style={{ height: 300 }} bordered={false} hoverable>
              <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="项目组成员 郭凌宇"
              >
              </Meta>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="site-card-border-less-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <Card  style={{ height: 300 }} bordered={false} hoverable>
              <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="项目组成员 杨晓燕"
              >
              </Meta>
            </Card>
          </Col>
          <Col span={6}>
            <Card  style={{ height: 300 }} bordered={false} hoverable>
              <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="项目组成员 韦晓彤"
              >
              </Meta>
            </Card>
          </Col>
          <Col span={6}>
            <Card  style={{ height: 300 }} bordered={false} hoverable>
              <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="项目组成员 崔靖怡"
              >
              </Meta>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;
