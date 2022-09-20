import React from "react";
import {Avatar, Button, Card, Drawer, List, Tabs, Tag,Empty, Checkbox,Spin} from 'antd';
import "./index.less";
import {FileSearchOutlined} from "@ant-design/icons";
import { luceneList } from "@/api/lucene";
const CheckboxGroup = Checkbox.Group;
const { TabPane } = Tabs;
const { Meta } = Card;

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};

class KnowledgeCard extends React.Component{
    state={
        visible: false,
        listNum: null,
        abluceneData:[[],[],[]],
        value:"",
        checkedList: [],
        indeterminate: true,
        checkAll: false,
        loading1:false,
        loading2:false
    }

    callback = key => {
        console.log(key);
        this.setState({abluceneData:[[],[],[]]})
    }

    getCheckData = () => {
        const rData = this.props.rData.links
        console.log(rData)
        if(rData.length>0){
            const plainOptions = []
            for(let i= 0; i<rData.length; i++){
                if(rData[i].target.substring(0,1)==="y"){
                    plainOptions.push("（"+rData[i].category+"）"+rData[i].target.substr(1))
                }else{
                    if(rData[i].target === "广州事件"){
                        break;
                    }else {
                        plainOptions.push("（" + rData[i].category + "）" + rData[i].target)
                    }
                }

            }
            console.log(plainOptions)
            return(plainOptions)
        }
    }
    //单选
    onChange = checkedList => {
        const plainOptions =this.getCheckData()
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };
    //全选
    onCheckAllChange = e => {
        const plainOptions =this.getCheckData()
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    //获得所有相关事件
    getThing = () => {
        const thing = this.props.cardData[2]
        const ThingList = []
        for(let i= 0; i<thing.length; i++){
            thing[i].length>8?
                ThingList.push(
                    <Card.Grid style={{ height:120,width: '66%'}}>
                        <Avatar size={50} src= {"http://39.101.193.14:2222/"+thing[i]+".jpg"}/>
                        <Tag color="purple" style={{fontSize:"15px"}}>{thing[i]}</Tag>
                    </Card.Grid>
                ):
            ThingList.push(
                <Card.Grid style={{ height:120,width: '33%'}}>
                    <Avatar size={50} src= {"http://39.101.193.14:2222/"+thing[i]+".jpg"}/>
                    <Tag color="purple" style={{fontSize:"15px"}}>{thing[i]}</Tag>
                </Card.Grid>
            )
        }
        return(thing.length>0? ThingList : "暂无信息！")
    }
    //获得所有相关人物
    getPeople = () => {
        const people = this.props.cardData[3]
        const PeopleList = []
        for(let i= 0; i<people.length; i++){
            PeopleList.push(
                <Card.Grid style={{ height:120,width: '33%'}}>
                    <Avatar size={50} src= {people[i].includes("相关人物")?"http://39.101.193.14:2222/"+people[i].substr(5)+".jpg":"http://39.101.193.14:2222/"+people[i].substr(3)+".jpg"}/>
                    <Tag color="magenta" style={{fontSize:"15px"}}>{people[i]}</Tag>
                </Card.Grid>
            )
        }
        return(people.length>0? PeopleList : "暂无信息！")
    }
    //获得实体简介
    getIntroduction = () => {
        const Introduction = this.props.cardData[1]
        const IntroductionList = []
        for(let i= 0; i<Introduction.length; i++){
            IntroductionList.push(
                <Tag color="blue" style={{fontSize:"15px"}}>{Introduction[i]}</Tag>
            )
        }
        return(Introduction.length>0? IntroductionList : "暂无信息！")
    }

    //回溯
    fetchData = (data) => {
        this.setState({loading1:true})
        luceneList(data).then((response) => {
            let num = ""
            if (response.data.length>0){
                num = response.data[0].num
            }else{
                num = "未检索到相关内容！"
            }
            const filename = []
            const content = []
            const abluceneData = []
            response.data.forEach(function (file) {
                filename.push(file.fileName)
                content.push(file.content)
            })
            abluceneData.push(num,filename,content)
            let value = data
            this.setState({loading1:false})
            this.setState({ value,abluceneData });
        });
    };

    //三元组回溯
    fetchData2 = (data) => {
        this.setState({loading2:true})
        let text = this.props.cardData[0][0]
        for(let i=0;i<data.length;i++){
            let e = data[i].split("）")[1]
            text = text+e
        }
        console.log(text)
        luceneList(text).then((response) => {
            let num = ""
            if (response.data.length>0){
                num = response.data[0].num
            }else{
                num = "未检索到相关内容！"
            }
            const filename = []
            const content = []
            const abluceneData = []
            response.data.forEach(function (file) {
                filename.push(file.fileName)
                content.push(file.content)
            })
            abluceneData.push(num,filename,content)
            let value = data
            this.setState({loading2:false})
            this.setState({ value,abluceneData });
        });
    };

    showDrawer = e => {
        console.log(e.target.value)
        this.setState({
            visible: true,
            listNum: e.target.value
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    clickContentList = () => {
        if(this.state.abluceneData[0].length>0){
            const cardList = []
            const filename = this.state.abluceneData[1]
            for(let i =0;i < filename.length;i++){
                cardList.push(
                    <Card.Grid style={gridStyle}>
                        <List
                            dataSource={[
                                {
                                    name: filename[i],
                                },
                            ]}
                            bordered
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar alt="暂无图片" src={"http://39.101.193.14:2222//book/"+item.name+".png"} style={{width:"50px" , height:"80px"}} shape="square"/>
                                        }
                                        title={<a key={`a-${item.id}`}>{item.name}</a>}
                                        description={"简介"}
                                    />
                                    <Button type="primary" value={i} onClick={this.showDrawer}>
                                        查看详情
                                    </Button>
                                </List.Item>
                            )}
                        />
                        <Drawer
                            title={this.state.abluceneData[1][this.state.listNum]}
                            width={1100}
                            placement="left"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <div dangerouslySetInnerHTML={{ __html: this.state.abluceneData[2][this.state.listNum]}}/>
                            <br/><br/>
                            {/*<center>*/}
                            {/*    <Pagination simple defaultCurrent={2} total={50} />*/}
                            {/*</center>*/}
                        </Drawer>
                    </Card.Grid>
                )
            }
            console.log(cardList)
            const title = "全文检索结果"+this.state.abluceneData[0]
            return(
                <Card
                    style={{ height:550,overflow:"auto"}}
                    title= {title} >
                    {cardList}
                </Card>
            )
        }
    }

    render(){
        console.log(this.state.checkedList)
        console.log(this.props.cardData[0].length)
        return(
            <div>
                <Tabs defaultActiveKey="1"  type="card" onChange={this.callback}>
                    <TabPane tab="实体信息" key="1">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={
                                <span>
                                          知识简介
                                        </span>
                            }
                                     key="1"
                            >
                                <Card
                                    style={{height:570,background:"#FFFFFF",overflow:"auto"}}
                                >
                                    <Meta
                                        avatar={<Avatar  alt="知识点" size={64} src={"http://39.101.193.14:2222/"+this.props.cardData[0][0]+".jpg"}/> }
                                        title={this.props.cardData?this.props.cardData[0][0]:null}
                                        // description={this.props.cardData[0].length>0?this.props.cardData[0][1]:"暂无信息！"}
                                    />
                                    <br/>
                                    {this.props.cardData[0].length>0?this.props.cardData[0][1]:"暂无信息！"}
                                </Card>
                            </TabPane>
                            <TabPane tab={
                                <span>
                                          详细信息
                                        </span>
                            }
                                     key="2"
                            >
                                <Card title="详细信息" style={{height:570,background:"#FFFFFF",overflow:"auto"}}>
                                    {this.getIntroduction()}
                                </Card>
                            </TabPane>
                            <TabPane tab={
                                <span>
                                          相关事件
                                        </span>
                            }
                                     key="3"
                            >
                                <Card title="相关事件" style={{height:570,background:"#FFFFFF",overflow:"auto"}}>
                                    {this.getThing()}
                                </Card>
                            </TabPane>
                            <TabPane tab={
                                <span>
                                          相关人物
                                        </span>
                            }
                                     key="4"
                            >
                                <Card title="相关人物" style={{height:570,background:"#FFFFFF",overflow:"auto"}}>
                                    {this.getPeople()}
                                </Card>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab="实体语料回溯" key="2">
                        <Button onClick={() => this.fetchData(this.props.cardData[0][0])}><FileSearchOutlined/>实体语料回溯</Button>
                        {this.state.loading1?<div className="spin"><Spin/></div>:this.clickContentList()?this.clickContentList():<Empty/>}
                    </TabPane>
                    <TabPane tab="三元组语料回溯" key="3">
                        {this.getCheckData()?<div><div>
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    indeterminate={this.state.indeterminate}
                                    onChange={this.onCheckAllChange}
                                    checked={this.state.checkAll}
                                >
                                    全选
                                </Checkbox>
                                <Button onClick={() => this.fetchData2(this.state.checkedList)}><FileSearchOutlined/>三元组语料回溯</Button>
                            </div>
                            <br />
                            <Card style={{ height:200,overflow:"auto"}}>
                                <CheckboxGroup
                                    options={this.getCheckData()}
                                    value={this.state.checkedList}
                                    onChange={this.onChange}
                                />
                            </Card>
                        </div>{this.state.loading2?<div className="spin"><Spin/></div>:this.clickContentList()?this.clickContentList():""}</div>:<Empty/>}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default KnowledgeCard;