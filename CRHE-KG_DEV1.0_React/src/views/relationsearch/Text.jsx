import React from "react";
import "driver.js/dist/driver.min.css"; // import driver.js css
import {Avatar, Drawer, List, Card, Button, Empty} from 'antd';

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};

class Text extends React.Component{

    state = {
        visible: false,
        listNum: null,
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
        if(this.props.abluceneData[0].length>0){
            const cardList = []
            const filename = this.props.abluceneData[1]
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
                            title={this.props.abluceneData[1][this.state.listNum]}
                            width={1100}
                            placement="left"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <div dangerouslySetInnerHTML={{ __html: this.props.abluceneData[2][this.state.listNum]}}/>
                            <br/><br/>
                            {/*<center>*/}
                            {/*    <Pagination simple defaultCurrent={2} total={50} />*/}
                            {/*</center>*/}
                        </Drawer>
                    </Card.Grid>
                )
            }
            console.log(cardList)
            const title = "全文检索结果"+this.props.abluceneData[0]
            return(
                <Card
                    style={{ height:600,overflow:"auto"}}
                    title= {title} >
                    {cardList}
                </Card>
            )
        }
    }

    render(){
        console.log(this.props.abluceneData)
        return (
            <div>
                {this.clickContentList()?this.clickContentList():<Empty/>}
            </div>
        );
    }
};

export default Text;
