import { ForkOutlined,DeploymentUnitOutlined,ShareAltOutlined } from '@ant-design/icons';
import styles from "@/pages/KnowledgeSearch/index.less";
import React,{ PureComponent,useState } from "react";
import { Row,Tabs,Avatar,Image,Checkbox,Divider,Tag,Card,Col } from 'antd';

class information extends PureComponent {
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    visible: false,
  };
  onClick = (index) => {
    if(index === '2') {
      console.log(index)
    }
  }
  // 实体信息
  onInformation = () => {
    const { propSearch,detailData,chartsData } = this.props
    // 详细信息
    let detail=[]
    // 相关事件
    let relevance=[]
    // 相关人物
    let people=[]
    const categorys=['相关遗存','事件地点','地理位置','出生地点','签订地点','开始时间','结束时间','出生日期','逝世日期','签订时间']
    chartsData.links!==null?chartsData.links.forEach(item => {
      if(item.category === '相关事件') {
        relevance.push({
          name:item.target,
          url:`http://39.101.193.14:2222/${item.target}.jpg`
        })
      }else if(categorys.includes(item.category)){
        if(item.target.substring(0,1) === "y") {
          detail.push(`${item.category} ${item.target.substr(1)}`)
        } else {
          detail.push(`${item.category} ${item.target}`)
        }
      }else {
        people.push({
          name:item.target,
          url:`http://39.101.193.14:2222/${item.target}.jpg`
        })
      }
    }) : ''

    // 知识简介
    let brief = ''
    const briefUrl = `http://39.101.193.14:2222/${propSearch}.jpg`
    detailData.links !== null ? detailData.links.forEach(item => {
      if(item.category === 'comment') {
        brief = item.target
      }else{
        detail.push(`${item.label} ${item.target}`)
      }
    }) : ''

    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="知识简介" key="1">
          <div className={styles.contentDiv}>
            <div>
              <Avatar
                size={64}
                src={briefUrl}
              />
              <span className={styles.author}>{propSearch[0]}</span>
            </div>
            <p className={styles.briefContent}>
              {brief}
            </p>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="详细信息" key="2">
          <div className={styles.contentDiv}>
            {
              detail.map(function(item,index){
                return (
                  <Tag className={styles.detail} color="geekblue" key={index}>{item}</Tag>
                )
              })
            }
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="相关事件" key="3">
          <div className={styles.contentDiv}>
            {
              relevance.map(function(item,index){
                return (
                  <div className={styles.relevance} key={index}>
                    <Avatar
                      className={styles.relevanceImg}
                      size={64}
                      src={item.url}
                    />
                    <p><Tag className={styles.detail} color="gold">{item.name}</Tag></p>
                  </div>
                )
              })
            }
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="相关人物" key="4">
          <div className={styles.contentDiv}>
            {
              people.map(function(item,index){
                return (
                  <div className={styles.relevance} key={index}>
                    <Avatar
                      className={styles.relevanceImg}
                      size={64}
                      src={item.url}
                    />
                    <p><Tag className={styles.detail} color="green">{item.name}</Tag></p>
                  </div>
                )
              })
            }
          </div>
        </Tabs.TabPane>
      </Tabs>
    )
  }

  // 三元组语料回溯
  onThree = () => {
    const { chartsData } = this.props
    let three = []
    chartsData.links !== null ? chartsData.links.forEach(item => {
      if(item.target.substring(0,1) === "y") {
        three.push(`（${item.category}）${item.target.substr(1)}`)
      } else {
        three.push(`（${item.category}）${item.target}`)
      }
    }) : ''
    const onCheckAllChange = e => {
      this.setState({
        checkedList: e.target.checked ? three : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    };
    const onChange = checkedList => {
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < three.length,
        checkAll: checkedList.length === three.length,
      });
    };
    return (
      <div className={styles.threeDiv}>
        <Checkbox indeterminate={this.state.indeterminate} onChange={onCheckAllChange} checked={this.state.checkAll}>
          全选
        </Checkbox>
        <Divider />
        <Checkbox.Group options={three} className={styles.three} value={this.state.checkedList} onChange={onChange} />
      </div>
    )
  }

  render(){
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard} onChange={this.onClick}>
          <Tabs.TabPane tab="实体信息" key="1" className={styles.innerCard}>
            {this.onInformation()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="实体语料回溯" key="2">
          </Tabs.TabPane>
          <Tabs.TabPane tab="三元组语料回溯" key="3">
            {this.onThree()}
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }

}

export default information
