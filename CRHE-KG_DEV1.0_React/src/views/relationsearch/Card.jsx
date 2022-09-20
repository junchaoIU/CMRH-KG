import React from "react";
import { Card, Avatar,Tag,Tabs,Collapse} from 'antd';
import Text from "./Text";
const { Meta } = Card;
const { TabPane } = Tabs;
const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

class SearchCard extends React.Component{

    //相同身份信息
    getSameIntro = () => {
        const {cardData1,cardData2} = this.props
        const SameIntro = []
        const data1 =this.props.cardData1[1]
        const data2 =this.props.cardData2[1]
        if(data2.length>0 && data1.length>0) {
            for (let i = 0; i < data1.length; i++) {
                this.props.cardData2[1].forEach(function (item){
                    console.log(item)
                    console.log(data1[i])
                    if (item.split(" ")[1] === data1[i].split(" ")[1]) {
                        SameIntro.push(
                            <Tag color="blue" style={{fontSize:"15px"}}>{cardData1[0][0]+" "+data1[i]}<br/>{cardData2[0][0]+" "+item}</Tag>
                        )
                    }
                })
            }
        }
        return(SameIntro.length>0? SameIntro : "暂无信息！")
    }

    //相同相关事件
    getSameThing = () => {
        const {cardData1,cardData2} = this.props
        const SameIntro = []
        const data1 =this.props.cardData1[2]
        const data2 =this.props.cardData2[2]
        if(data2.length>0 && data1.length>0) {
            for (let i = 0; i < data1.length; i++) {
                this.props.cardData2[2].forEach(function (item){
                    if (item.split(" ")[1] === data1[i].split(" ")[1]) {
                        SameIntro.push(
                            <Tag color="purple" style={{fontSize:"15px"}}>{cardData1[0][0]+" "+data1[i]}<br/>{cardData2[0][0]+" "+item}</Tag>
                        )
                    }
                })
            }
        }
        return(SameIntro.length>0? SameIntro : "暂无信息！")
    }

    //相同相关人物
    getSamePeople = () => {
        const {cardData1,cardData2} = this.props
        console.log(cardData1)
        const SameIntro = []
        const data1 =this.props.cardData1[3]
        const data2 =this.props.cardData2[3]
        if(data2.length>0 && data1.length>0) {
            for (let i = 0; i < data1.length; i++) {
                this.props.cardData2[3].forEach(function (item){
                    if (item.split(" ")[1] === data1[i].split(" ")[1]) {
                        SameIntro.push(
                            <Tag color="magenta" style={{fontSize:"15px"}}>{cardData1[0][0]+" "+data1[i]}<br/>{cardData2[0][0]+" "+item}</Tag>
                        )
                    }
                })
            }
        }
        return(SameIntro.length>0? SameIntro : "暂无信息！")
    }

    //第一个实体的相关事件
    getThing1 = () => {
        const thing1 = this.props.cardData1[2]
        const ThingList1 = []
        for(let i= 0; i<thing1.length; i++){
            thing1[i].length>8?
                ThingList1.push(
                    <Card.Grid style={{ height:120,width: '66%'}}>
                        <Avatar size={50} src= {"http://39.101.193.14:2222/"+thing1[i]+".jpg"}/>
                        <Tag color="purple" style={{fontSize:"15px"}}>{thing1[i]}</Tag>
                    </Card.Grid>
                ):
                ThingList1.push(
                    <Card.Grid style={{ height:120,width: '33%'}}>
                        <Avatar size={50} src= {"http://39.101.193.14:2222/"+thing1[i]+".jpg"}/>
                        <Tag color="purple" style={{fontSize:"15px"}}>{thing1[i]}</Tag>
                    </Card.Grid>
                )
        }
        return(thing1.length>0? ThingList1 : "暂无信息！")
    }
    //第一个实体的相关人物
    getPeople1 = () => {
        const people1 = this.props.cardData1[3]
        const PeopleList1 = []
        for(let i= 0; i<people1.length; i++){
            PeopleList1.push(
                <Card.Grid style={{ height:120,width: '33%'}}>
                    <Avatar size={50} src= {people1[i].includes("相关人物")?"http://39.101.193.14:2222/"+people1[i].substr(5)+".jpg":"http://39.101.193.14:2222/"+people1[i].substr(3)+".jpg"}/>
                    <Tag color="magenta" style={{fontSize:"15px"}}>{people1[i]}</Tag>
                </Card.Grid>
            )
        }
        return(people1.length>0? PeopleList1 : "暂无信息！")
    }
    //第一个实体的简介
    getIntroduction1 = () => {
        const Introduction1 = this.props.cardData1[1]
        const IntroductionList1 = []
        for(let i= 0; i<Introduction1.length; i++){
            IntroductionList1.push(
                <Tag color="blue" style={{fontSize:"15px"}}>{Introduction1[i]}</Tag>
            )
        }
        return(Introduction1.length>0? IntroductionList1 : "暂无信息！")
    }
    //第二个实体的相关事件
    getThing2 = () => {
        const thing2 = this.props.cardData2[2]
        const ThingList2 = []
        for(let i= 0; i<thing2.length; i++){
            thing2[i].length>8?
                ThingList2.push(
                    <Card.Grid style={{ height:120,width: '66%'}}>
                        <Avatar size={50} src= {"http://39.101.193.14:2222/"+thing2[i]+".jpg"}/>
                        <Tag color="purple" style={{fontSize:"15px"}}>{thing2[i]}</Tag>
                    </Card.Grid>
                ):
                ThingList2.push(
                    <Card.Grid style={{ height:120,width: '33%'}}>
                        <Avatar size={50} src= {"http://39.101.193.14:2222/"+thing2[i]+".jpg"}/>
                        <Tag color="purple" style={{fontSize:"15px"}}>{thing2[i]}</Tag>
                    </Card.Grid>
                )
        }
        return(thing2.length>0? ThingList2 : "暂无信息！")
    }
    //第二个实体的相关人物
    getPeople2 = () => {
        const people2 = this.props.cardData2[3]
        const PeopleList2 = []
        for(let i= 0; i<people2.length; i++){
            PeopleList2.push(
                <Card.Grid style={{ height:120,width: '33%'}}>
                    <Avatar size={50} src= {people2[i].includes("相关人物")?"http://39.101.193.14:2222/"+people2[i].substr(5)+".jpg":"http://39.101.193.14:2222/"+people2[i].substr(3)+".jpg"}/>
                    <Tag color="magenta" style={{fontSize:"15px"}}>{people2[i]}</Tag>
                </Card.Grid>
            )
        }
        return(people2.length>0? PeopleList2 : "暂无信息！")
    }
    //第二个实体的简介
    getIntroduction2 = () => {
        const Introduction2 = this.props.cardData2[1]
        const IntroductionList2 = []
        for(let i= 0; i<Introduction2.length; i++){
            IntroductionList2.push(
                <Tag color="blue" style={{fontSize:"15px"}}>{Introduction2[i]}</Tag>
            )
        }
        return(Introduction2.length>0? IntroductionList2 : "暂无信息！")
    }

    render(){
        let abluceneData=this.props.abluceneData
        console.log(abluceneData)
        return(
            <div>
                <Tabs onChange={callback} type="card">
                    <TabPane tab="实体信息" key="1">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="简介" key="1">
                                <Card
                                    style={{height:285,background:" #FFFFFF",overflow:"auto"}}
                                >
                                    <Meta
                                        avatar={<Avatar  alt="知识点" size={64} src={"http://39.101.193.14:2222/"+this.props.cardData1[0][0]+".jpg"}/> }
                                        title={this.props.cardData1?this.props.cardData1[0][0]:null}
                                        // description={this.props.cardData[0].length>0?this.props.cardData[0][1]:"暂无信息！"}
                                    />
                                    <br/>
                                    {this.props.cardData1[0].length>0?this.props.cardData1[0][1]:"暂无信息！"}
                                </Card>
                                <Card
                                    style={{height:285,background:" #FFFFFF",overflow:"auto"}}
                                >
                                    <Meta
                                        avatar={<Avatar  alt="知识点" size={64} src={"http://39.101.193.14:2222/"+this.props.cardData2[0][0]+".jpg"}/> }
                                        title={this.props.cardData2?this.props.cardData2[0][0]:null}
                                        // description={this.props.cardData[0].length>0?this.props.cardData[0][1]:"暂无信息！"}
                                    />
                                    <br/>
                                    {this.props.cardData2[0].length>0?this.props.cardData2[0][1]:"暂无信息！"}
                                </Card>
                            </TabPane>
                            <TabPane tab="详细信息" key="2">
                                <Card title="详细信息" style={{height:285,background:" #FFFFFF",overflow:"auto"}}>
                                    {this.getIntroduction1()}
                                </Card>
                                <Card title="详细信息" style={{height:285,background:" #FFFFFF",overflow:"auto"}}>
                                    {this.getIntroduction2()}
                                </Card>
                            </TabPane>
                            <TabPane tab="相关事件" key="3">
                                <Card title="相关事件" style={{height:285,background:" #FFFFFF",overflow:"auto"}}>
                                    {this.getThing1()}
                                </Card>
                                <Card title="相关事件" style={{height:285,background:" #FFFFFF",overflow:"auto"}}>
                                    {this.getThing2()}
                                </Card>
                            </TabPane>
                            <TabPane tab="相关人物" key="4">
                                <Card title="相关人物" style={{height:285,background:" #FFFFFF",overflow:"auto"}}>
                                    {this.getPeople1()}
                                </Card>
                                <Card title="相关人物" style={{height:285,background:" #FFFFFF",overflow:"auto"}}>
                                    {this.getPeople2()}
                                </Card>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab="相同关系信息" key="2">
                        <Collapse bordered={false} defaultActiveKey={['1','2','3']}>
                            <Panel header="共同实体信息" key="1" style={{background:" #FFFFFF",overflow:"auto"}}>
                                {this.getSameIntro()}
                            </Panel>
                            <Panel header="共同事件关系" key="2" style={{background:" #FFFFFF",overflow:"auto"}}>
                                {this.getSameThing()}
                            </Panel>
                            <Panel header="共同人物关系" key="3" style={{background:" #FFFFFF",overflow:"auto"}}>
                                {this.getSamePeople()}
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane tab="关系实体回溯" key="3">
                        <Text abluceneData={abluceneData}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default SearchCard;