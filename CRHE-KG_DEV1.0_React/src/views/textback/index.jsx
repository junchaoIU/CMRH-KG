import React, { Component } from "react";
import "./index.less";
// import { lucene2List } from "@/api/lucene";
import { luceneList } from "@/api/lucene";
import {PageHeader, Avatar, Drawer, Input, List, Card, Button, Form, Collapse, Tabs, Empty, Spin} from 'antd';
const { Search } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;


const gridStyle = {
    width: '50%',
    textAlign: 'center',
};
class Textback extends Component{

    state = {
        visible: false,
        listNum: null,
        abluceneData:[[],[],[]],
        value:"",
        loading:false

    };

    fetchData = (data) => {
        this.setState({loading:true})
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
            this.setState({loading:false})
            this.setState({ value,abluceneData });
        });
        // lucene2List(data).then((response) => {
        //     let num = ""
        //     if (response.data.length>0){
        //         num = response.data[0].num+"（取排名前十的语料）"
        //     }else{
        //         num = "未检索到相关内容！"
        //     }
        //     const filename = []
        //     const content = []
        //     const abluceneData = []
        //     response.data.forEach(function (file) {
        //         filename.push(file.bookName)
        //         content.push(file.bookContent)
        //     })
        //     abluceneData.push(num,filename,content)
        //     let value = data
        //     this.setState({ value,abluceneData });
        //     this.setState({loading:false})
        // });
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
                            width={850}
                            placement="right"
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
                    title= {title} >
                    {cardList}
                </Card>
            )
        }
    }

    render() {
        return (
            <div className="app-container">
                <br/>
                <br/>
                <br/>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="语料回溯" key="1" style={{backgroundColor:"white"}}>
                        <Form layout="inline">
                            <Search
                                placeholder="请检索需要查询的实体知识或三元组（关系）或者问题驱动"
                                enterButton="语料回溯"
                                size="large"
                                onSearch={value => this.fetchData(value)}
                            />
                        </Form>
                    </Panel>
                </Collapse>
                {this.state.loading?
                    <div className="spin">
                        <Spin  tip="Loading..." spinning={this.state.loading}/>
                    </div> :
                    <PageHeader
                        className="site-page-header-responsive"
                        title={this.state.value?this.state.value:""}
                        subTitle={this.state.value?"的语料回溯":""}
                        footer={
                            this.clickContentList()?
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="回溯结果" key="1">
                                        {this.clickContentList()?this.clickContentList():"暂无数据，请检索需求查询的实体或三元组（关系）"}
                                    </TabPane>
                                </Tabs>:
                                <Empty style={{height:500}}/>
                        }
                    />}
            </div>
        );
    }
}

export default Textback;
/*
<footer className="footer">
    © 2020 北京师范大学.珠海
</footer>
*/
