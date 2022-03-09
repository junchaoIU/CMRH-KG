import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import 'rc-banner-anim/assets/index.css';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import {Card, Typography} from 'antd';
import styles from './index.less';
import Knowledge from '@/pages/Welcome/components/Knowledge';
import NumService from '@/pages/Welcome/components/NumService';
import TweenOne from "rc-tween-one";
import SubText from "@/pages/Welcome/components/SubText";
import QueueAnim from 'rc-queue-anim';
import Avatar from "antd/es/avatar";
const { Meta } = Card;
class home extends Component {

  geInterval = (e) => {
    switch (e.index) {
      case 0:
        return 0;
      case 1:
        return 150;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 150 + 450 + (e.index - 2) * 10;
      default:
        return 150 + 450 + (e.index - 6) * 150;
    }
  }

  getEnter = (e) => {
    const t = {
      opacity: 0,
      scale: 0.8,
      y: '-100%',
    };
    if (e.index >= 2 && e.index <= 6) {
      return { ...t, y: '-30%', duration: 150 };
    }
    return t;
  }

  render() {
    return (
      <div>
        <Card className={styles.header}>
          <Typography className={styles.title}>
            <div className="texty-demo" style={{ marginTop: 64 }}>
              <Texty
                className="title"
                type="mask-top"
                delay={400}
                enter={this.getEnter}
                interval={this.geInterval}
                component={TweenOne}
                componentProps={{
                  animation: [
                    { x: 130, type: 'set' },
                    { x: 100, delay: 500, duration: 450 },
                    {
                      ease: 'easeOutQuart',
                      duration: 300,
                      x: 0,
                    },
                    {
                      letterSpacing: 0,
                      delay: -300,
                      scale: 0.9,
                      ease: 'easeInOutQuint',
                      duration: 1000,
                    },
                    { scale: 1, width: '100%', delay: -300, duration: 1000, ease: 'easeInOutQuint' },
                  ],
                }}>中国近代革命历史数字图书馆</Texty>
            </div>
          </Typography>
          <Typography className={styles.text}>
            <div className="texty-demo" style={{ marginTop: 64, height: 25 }}>
              <SubText />
            </div>
          </Typography>
        </Card>
        <Typography className={styles.text}>
          <Card style={{ paddingLeft:100, width: "100%", marginTop: 16 }}>
            <Meta
              avatar={<Avatar src="http://t10.baidu.com/it/u=283995355,1605075388&fm=179&app=42&f=JPEG?w=120&h=120&s=86CBB45229F0C9EB14F9AC57030040F6" />}
              title="通知-From: Canton Knowledge Graph Development Team"
              description="注意：目前知识抽取平台模块及知识问答平台模块为开发测试阶段，无法访问&提供服务！！！"
            />
          </Card>
        </Typography>
        <Knowledge />
        <NumService />
      </div>
    );
  }
}
export default home;
