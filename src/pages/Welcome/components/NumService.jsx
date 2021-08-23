import React,{ Component } from 'react';
import { Card,Typography,Row,Col,Divider } from 'antd';
import { FileSearchOutlined,InteractionOutlined,HourglassOutlined,NodeIndexOutlined,UngroupOutlined,UserSwitchOutlined} from '@ant-design/icons';
import styles from '../index.less';

const numService = () => {
  return (
    <div>
      <Typography className={styles.knowledge}>
        数字服务
      </Typography>
      <Card className={styles.service} bordered={false}>
        <div className={styles.iconDiv}>
          <FileSearchOutlined  className={styles.icon} />
        </div>
        <div className={styles.contentDiv}>
          <p className={styles.title}>
            知识检索
          </p>
          <p className={styles.content}>
            数据结构化是人文知识扩展的必经之路。本平台提供实体目录支持系统结构化存储的所有实体的查看，涵盖多个实体分类，用户可通过检索框左边的知识目录进行展开、收起，进行系统存储实体的了解。也可以在目录上方的检索栏中输入自己感兴趣的实体，进行相关实体知识检索、知识图谱的查看、实体知识的了解。
          </p>
        </div>
      </Card>
      <Card className={styles.service} bordered={false}>
        <div className={styles.iconDiv}>
          <NodeIndexOutlined twoToneColor="#00a2d7" className={styles.icon} />
        </div>
        <div className={styles.contentDiv}>
          <p className={styles.title}>
            关系检索
          </p>
          <p className={styles.content}>
            知识关系检索是基于知识结构化拓展出来的功能，可以帮助人们进一步探索不同知识间的深层关系。本平台支持任意两个实体之间的关系检索，进行任意两点间关系的探索。用户可以通过对不同实体知识的检索来探索两点间的共指知识信息，通过可视化的方法进一步构建两个实体的数据结构体系。
          </p>
        </div>
      </Card>
      <Card className={styles.service} bordered={false}>
        <div className={styles.iconDiv}>
          <HourglassOutlined twoToneColor="#00a2d7" className={styles.icon} />
        </div>
        <div className={styles.contentDiv}>
          <p className={styles.title}>
            时空检索
          </p>
          <p className={styles.content}>
            时空检索基于事件回溯和人物回溯实体的时空数据，可以帮助人们进一步探索某个时间点或地点发生的事情。用户可以通过对检索想要了解的时间点和地点来了解该时空发生的事情，通过不同的检索组合将零碎的回溯实体拼接成不同的时间线，以全方面还原大家感兴趣的时空历史片段。
          </p>
        </div>
      </Card>
      <Card className={styles.service} bordered={false}>
        <div className={styles.iconDiv}>
          <UserSwitchOutlined twoToneColor="#00a2d7" className={styles.icon} />
        </div>
        <div className={styles.contentDiv}>
          <p className={styles.title}>
            人物回溯
          </p>
          <p className={styles.content}>
            人物回溯分析基于对不同人物实体的数据收集，通过数据结构化建立的知识线网络。本平台支持对人物实体的时间地点发展历程的地图三维演化，通过对人物实体一生的还原与再现，为读者建立起一个人物知识的立体知识体系。在检索框中检索所想回溯的人物实体点击检索，即可进行人物——时间地点历程三维演化。
          </p>
        </div>
      </Card>
      <Card className={styles.service} bordered={false}>
        <div className={styles.iconDiv}>
          <InteractionOutlined twoToneColor="#00a2d7" className={styles.icon} />
        </div>
        <div className={styles.contentDiv}>
          <p className={styles.title}>
            事件回溯
          </p>
          <p className={styles.content}>
            事件回溯分析基于对革命历史时间线的构建以及不同事件实体的数据收集，根据W3C在语义网中定义的N元关系表现形式建立的知识线网络。本平台支持对事件实体的时间地点发展历程的地图三维演化，对事件实体全过程进行还原与再现。在检索框中检索我们所想回溯的事件实体点击检索，即可进行事件——时间地点历程三维演化。
          </p>
        </div>
      </Card>
      <Card className={styles.service} bordered={false}>
        <div className={styles.iconDiv}>
          <UngroupOutlined twoToneColor="#00a2d7" className={styles.icon} />
        </div>
        <div className={styles.contentDiv}>
          <p className={styles.title}>
            语料回溯
          </p>
          <p className={styles.content}>
            语料回溯分析基于本平台抽取实体所用的主要语料构建的小型语料库，用户可检索想要了解的实体、三元组或者多个实体间的一些文字记载，通过lucene全文检索技术，提取出语料库中关系系数排名前十的语段进行展示。
          </p>
        </div>
      </Card>
    </div>
  )
}
export default numService;
