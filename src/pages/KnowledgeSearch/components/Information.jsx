import styles from "@/pages/KnowledgeSearch/index.less";
import React,{ PureComponent } from "react";
import { connect } from 'dva';
import { Row,Tabs,Avatar,message,Checkbox,Divider,Tag,Empty,Card,Button,Spin,Drawer } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
const Emptying =
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        暂无数据
      </span>
    }
  >
  </Empty>

@connect(({ knowledge,loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))

class information extends PureComponent {
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    visible: false,
    cardVisible: false,
    substance:[],
    loading: true,
  };
  onClick = (index) => {
    this.setState({
      substance:[],
      loading:true
    })
    if(index === '2') {
      const backWord = this.props.propSearch[0]
     this.onDispatch(backWord)
    }
  }
  onDispatch=(backWord)=>{
    const { dispatch } = this.props
    dispatch({
      type: 'knowledge/getSubstance',
      payload: backWord,
      callback: (response) => {
        if(response !== null) {
          this.setState({
            substance: response,
            loading:false
          })
        }
      }
    })
  }

  showDrawer=()=>{
    this.setState({
      visible:true
    })
  }
  onClose=()=>{
    this.setState({
      visible:false
    })
  }
  // 实体信息
  onInformation = () => {
    const { propSearch,detailData,chartsData } = this.props
    // 详细信息
    let detail = []
    // 相关事件
    let relevance = []
    // 相关人物
    let people = []
    const categorys = ['相关遗存','事件地点','地理位置','出生地点','签订地点','开始时间','结束时间','出生日期','逝世日期','签订时间']
    chartsData.links !== null ? chartsData.links.forEach(item => {
      if(item.category === '相关事件') {
        relevance.push({
          name: item.target,
          url: `http://39.101.193.14:2222/${item.target}.jpg`
        })
      } else if(categorys.includes(item.category)) {
        if(item.target.substring(0,1) === "y") {
          detail.push(`${item.category} ${item.target.substr(1)}`)
        } else {
          detail.push(`${item.category} ${item.target}`)
        }
      } else {
        people.push({
          name: item.target,
          url: `http://39.101.193.14:2222/${item.target}.jpg`
        })
      }
    }) : ''

    // 知识简介
    let brief = ''
    const briefUrl = `http://39.101.193.14:2222/${propSearch}.jpg`
    detailData.links !== null ? detailData.links.forEach(item => {
      if(item.category === 'comment') {
        brief = item.target
      } else {
        detail.push(`${item.label} ${item.target}`)
      }
    }) : ''

    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="知识简介" key="1">
          <div className={styles.contentDiv}>
            <div>
              <Avatar
                className={styles.authorImg}
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
              detail.length > 0 ? detail.map(function(item,index){
                return (
                  <Tag className={styles.detail} color="geekblue" key={index}>{item}</Tag>
                )
              }) : Emptying
            }
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="相关事件" key="3">
          <div className={styles.contentDiv}>
            {
              relevance.length > 0 ? relevance.map(function(item,index){
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
              }) : Emptying
            }
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="相关人物" key="4">
          <div className={styles.contentDiv}>
            {
              people.length > 0 ? people.map(function(item,index){
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
              }) : Emptying
            }
          </div>
        </Tabs.TabPane>
      </Tabs>
    )
  }

  // 实体语料回溯
  onSubstance = () => {
    const tip=this.state.substance.length>0?this.state.substance[0].num:''
    return (
      <Spin spinning={this.state.loading}>
              {
                this.state.substance.length>0?
                  <div className={styles.substanceDiv}>
                    <Card size="small" title={tip}>
                      {
                        this.state.substance.map((item,index) => {
                          return(
                            <Card hoverable >
                              <div className={styles.bookImage} key={index}>
                                <img
                                  style={{height:'100px'}}
                                  src={`http://39.101.193.14:2222//book/${item.fileName}.png`}
                                />
                              </div>
                              <p>{item.fileName}</p>
                              <p>简介</p>
                              <Button type={"primary"} onClick={this.showDrawer}>查看详情</Button>
                              <Drawer
                                title={item.fileName}
                                placement="left"
                                closable={false}
                                width={'50%'}
                                onClose={this.onClose}
                                visible={this.state.visible}
                                style={{animationTimingFunction:'ease-out'}}
                                maskStyle={{opacity:'0.1',animation:'1s infinite',boxShadow:'none' }}
                              >
                                <p style={{letterSpacing:'1px'}} dangerouslySetInnerHTML={{ __html: item.content}}/>
                              </Drawer>
                            </Card>
                          )
                        })
                      }
                    </Card>
                  </div>:Emptying
              }
            </Spin>
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
    const onClose=()=>{
      this.setState({
        cardVisible:false
      })
    }
    const onThreeSearch=()=>{
      this.setState({
        substance:[],
        loading:true
      })
      if(this.state.checkedList.length>0){
        const threeWord=`${this.props.propSearch[0]}${this.state.checkedList.join("").replace(/\（.*?\）/g,'')}`
        this.onDispatch(threeWord)
        this.setState({
          cardVisible:true
        })
      }else {
        message.warning("请选择三元组！");
      }
    }
    return (
      <div className={styles.threeDiv}>
        <Checkbox indeterminate={this.state.indeterminate} onChange={onCheckAllChange} checked={this.state.checkAll}>
          全选
        </Checkbox>
        <Button style={{float:'right'}} onClick={onThreeSearch}><FileSearchOutlined />三元组语料回溯</Button>
        <Divider />
        <Checkbox.Group options={three} className={styles.three} value={this.state.checkedList} onChange={onChange} />
        <Drawer
          title="三元组语料回溯"
          placement="right"
          closable={false}
          width={'70%'}
          onClose={onClose}
          visible={this.state.cardVisible}
          getContainer={false}
          style={{ position: 'absolute',transform:'none' }}
        >
          {this.onSubstance()}
        </Drawer>
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
            {this.onSubstance()}
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
