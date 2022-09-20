import React from "react";
import {PageHeader, Switch,} from 'antd';
import Backechart from "./Backechart";

class CenterArea extends React.Component{
    state={
      speed:2000
    }

    render(){
        let centerData = this.props.centerData
        const onClick=e=>{
            if (e){
                console.log("加速")
                this.setState({speed:1000})
                console.log(this.state.speed)
            }else{
                console.log("减速")
                this.setState({speed:2000})
                console.log(this.state.speed)
            }
        }
        return(
            <div style={{height:700}}>
                <PageHeader
                    className="site-page-header-responsive"
                    title={centerData.counties[0]?centerData.counties[0]+"的事件回溯":"请检索想要回溯的革命历史事件！"}
                >
                    播放速度：<Switch checkedChildren="快速" unCheckedChildren="慢速" onClick={onClick}/>
                </PageHeader>
                <Backechart centerData={centerData} speed={this.state.speed}/>
            </div>
        )
    }
}

export default CenterArea;