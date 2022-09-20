import React from "react";
import Peopleback from "../peopleback/index";
import Thingback from "../thingback/index";
import { Tabs, Icon } from 'antd';
const { TabPane } = Tabs;
const Svg2 = () => (
    <span className="iconfont" >&#xe66d;</span>
)
const Svg3 = () => (
    <span className="iconfont" >&#xe600;</span>
)

class Back extends React.Component{

    render(){
        return (
            <div style={{backgroundColor:"white",padding:10}} >
                <br/>
                <br/>
                <br/>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                              <Icon component={Svg3}/>
                              事件回溯
                            </span>
                        }
                        key="1"
                    >
                        <Thingback/>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                              <Icon component={Svg2}/>
                              人物回溯
                            </span>
                        }
                        key="2"
                    >
                        <Peopleback/>
                    </TabPane>
                </Tabs>,
            </div>

        );
    }
};

export default Back;

