import React from "react";
import { luceneList } from "@/api/lucene";
import {Card, Avatar, Tag, Timeline, Tabs, Empty, Icon, Spin, Button, List, Drawer,Pagination} from 'antd';
const { Meta } = Card;
const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}
const gridStyle = {
    width: '100%',
    textAlign: 'center',
};
class SearchCard extends React.Component{
    state={
        list:"",
        abluceneData:[[],[],[]],
        loading:false,
        visible:false,
        listNum:null,
    }

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
        if(this.state.abluceneData[1].length>0){
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
                            <center>
                                <Pagination simple defaultCurrent={2} total={50} />
                            </center>
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

    getTimeline = () => {
        const LineData = this.props.centerData.series
        const LineList = []
        if(LineData){
            for(let i=0; i<LineData.length;i++){
                LineList.push(
                    <Timeline.Item label={LineData[i][0][0]}><Icon type="history" />{LineData[i][0][0]}<br/><Icon type="environment" />{LineData[i][0][1]}<br/>{LineData[i][0][3]}</Timeline.Item>
                )
            }
        }else{
            LineList.push(<Timeline.Item label="">暂无数据</Timeline.Item>)
        }

        return LineList
    }

    getTimeline2 = () => {
        const LineData = this.props.centerData.series
        console.log(LineData)
        const LineList = []
        for(let i=0; i<LineData.length;i++){
            LineList.push(
                <Timeline.Item label={LineData[i][0][3]}>
                    <Button type="primary" icon="search"
                            onClick={()=> {
                                this.setState({loading: true})
                                luceneList(LineData[i][0][0] + LineData[i][0][1] + LineData[i][0][3]).then((response) => {
                                    let num = ""
                                    if (response.data.length > 0) {
                                        num = response.data[0].num
                                    } else {
                                        num = "未检索到相关内容！"
                                    }
                                    const filename = []
                                    const content = []
                                    const abluceneData = []
                                    response.data.forEach(function (file) {
                                        filename.push(file.fileName)
                                        content.push(file.content)
                                    })
                                    abluceneData.push(num, filename, content)
                                    let value = LineData[i][0][3]
                                    this.setState({value, abluceneData});
                                    console.log(this.state.abluceneData)
                                    this.setState({loading: false})
                                })
                            }
                            }
                    >
                        {LineData[i][0][3]}
                    </Button>
                </Timeline.Item>
                // <Panel header={LineData[i][0][3]} key={LineData[i][0][3]}>
                //     {this.state.loading2?<Spin/>:this.state.list}
                // </Panel>

            )
        }
        return LineList
    }


    render(){

        return(
            <Tabs defaultActiveKey="1"  type="card" onChange={callback} >
                <TabPane tab="人物时间线" key="1">
                    <Timeline mode="left" style={{padding:10,height:600,overflow:"auto"}}>
                        {this.getTimeline().length>0?this.getTimeline():<Empty/>}
                    </Timeline>
                </TabPane>
                <TabPane tab="人物信息" key="2">
                    <Tabs defaultActiveKey="1" tabPosition="top" onChange={callback}>
                        <TabPane tab="简介" key="1">
                            <Card
                                style={{height:600,background:" #FFFFFF",overflow:"auto"}}
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
                        <TabPane tab="详细信息" key="2">
                            <Card title="详细信息" style={{height:600,background:" #FFFFFF",overflow:"auto"}}>
                                {this.getIntroduction()}
                            </Card>
                        </TabPane>
                        <TabPane tab="相关事件" key="3">
                            <Card title="相关事件" style={{height:600,background:" #FFFFFF",overflow:"auto"}}>
                                {this.getThing()}
                            </Card>
                        </TabPane>
                        <TabPane tab="相关人物" key="4">
                            <Card title="相关人物" style={{height:600,background:" #FFFFFF",overflow:"auto"}}>
                                {this.getPeople()}
                            </Card>
                        </TabPane>
                    </Tabs>
                </TabPane>
                <TabPane tab="事件语料回溯" key="3">
                    <Card style={{ height:250,overflow:"auto"}}>
                        <Timeline mode="left" style={{padding:10,height:200,overflow:"auto"}}>
                            {this.getTimeline2().length>0?this.getTimeline2():<Empty/>}
                        </Timeline>
                        {/*<Collapse onChange={this.callback1} accordion>*/}
                        {/*    {this.getTimeline2().length>0?this.getTimeline2():<Empty/>}*/}
                        {/*</Collapse>*/}
                    </Card>
                    {this.state.loading?<div className="spin"><Spin/></div>:this.clickContentList()}
                </TabPane>
            </Tabs>
        )
    }
}

export default SearchCard;