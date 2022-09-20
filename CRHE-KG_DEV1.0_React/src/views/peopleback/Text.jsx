import React from "react";
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import { luceneList } from "@/api/relationSearch";
import {Avatar, Drawer, Input, List, Pagination,Card,Button,Pagination} from 'antd';
const { Search } = Input;

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};

class Text extends React.Component{

    state = {
        visible: false,
        listNum: null,
        abluceneData:[[],[],[]],
    };

    fetchData = (data) => {
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
            this.setState({ abluceneData });
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

    render(){
        return (
            <div>
                <Search
                    placeholder="输入想要回溯的人物关系"
                    enterButton="三元组回溯"
                    size="large"
                    onSearch={value => this.fetchData(value)}
                />
                {this.clickContentList()}
            </div>
        );
    }
};

export default Text;
