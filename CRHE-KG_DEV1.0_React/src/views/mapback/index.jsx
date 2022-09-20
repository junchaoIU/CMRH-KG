import React from "react";
import "./index.less";
import {Button,Collapse, Form, Input,} from "antd"
import Backechart from "./Backechart";
const { Panel } = Collapse;

class Mapback extends React.Component{

    state= {
        value: "",
    }

    valueChange = (e) => {
        const value = e.target.value
        this.setState((state) => ({
            value:value
        }));
        console.log(value)
    };


    render(){
        return (
            <div className="app-container">
                    <Collapse defaultActiveKey={["1"]}>
                        <Panel header="地图回溯" key="1">
                            <Form layout="inline">
                                <Form.Item label="地点实体:">
                                    <Input onChange={this.valueChange}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" icon="search">
                                        开始回溯
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Panel>
                    </Collapse>
                <Backechart/>
            </div>
        );
    }
};

export default Mapback;
