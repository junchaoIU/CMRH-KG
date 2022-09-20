import React from "react";
import { luceneList } from "@/api/lucene";
import {Avatar, Button, Card, Drawer, List, Tabs, Tag, Timeline, Icon, Empty, Spin,Pagination} from 'antd';
import "./index.less";
const { TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};


class TimeSpaceCard extends React.Component{
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

    //获得相关实体
    getEntity = () => {
        const Entity = this.props.cardData[1]
        const EntityList = []
        for(let i= 0; i<Entity.length; i++){
            EntityList.push(
                <Tag color="blue" style={{fontSize:"15px"}}>{Entity[i]}</Tag>
            )
        }
        return(Entity.length>0? EntityList : "暂无信息！")
    }

    getComment = () => {
        const Comment = this.props.cardData[0]
        const CommentList = []
        for(let i= 0; i<Comment.length; i++){
            CommentList.push(
                <Timeline.Item><Icon type="link" />{Comment[i][0]}<br/><Icon type="history" />{Comment[i][1]}<br/><Icon type="environment" />{Comment[i][2]}<br/>{Comment[i][3]}</Timeline.Item>
            )
        }
        return(Comment.length>0? <Timeline>{CommentList}</Timeline> : "暂无信息！")
    }

    getTimeline2 = () => {
        const LineData = this.props.cardData[0]
        console.log(LineData)
        const LineList = []
        for(let i=0; i<LineData.length;i++){
            LineList.push(
                <Timeline.Item label={LineData[i][3]}>
                    <Button type="primary" icon="search"
                            onClick={()=> {
                                this.setState({loading: true})
                                luceneList(LineData[i][0] + LineData[i][1] + LineData[i][3]).then((response) => {
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
                                    let value = LineData[i][3]
                                    this.setState({value, abluceneData});
                                    console.log(this.state.abluceneData)
                                    this.setState({loading: false})
                                })
                            }
                            }
                    >
                        {LineData[i][3]}
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
        console.log(this.props.cardData)
        return(
            <div>
                <Tabs defaultActiveKey="2"  type="card" onChange={callback}>
                    <TabPane tab="相关实体" key="1">
                        <Card title="相关实体" style={{height:600,background:" #FFFFFF",overflow:"auto"}}>
                            {this.getEntity()}
                        </Card>
                    </TabPane>
                    <TabPane tab="回溯时空信息" key="2" style={{overflow:"auto"}}>
                        <Card  style={{height:600,background:"#FFFFFF",overflow:"auto"}}>
                            {this.getComment()}
                        </Card>
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
            </div>
        )
    }
}

export default TimeSpaceCard;