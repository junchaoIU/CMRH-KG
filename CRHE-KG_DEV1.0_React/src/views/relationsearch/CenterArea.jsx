import React from "react";
import CenterGraph from "./CenterGraph";
import {PageHeader,Typography} from 'antd';
const { Paragraph } = Typography;

class CenterArea extends React.Component{

    render(){
        let realationshipData=this.props.realationshipData
        console.log(realationshipData)
        let rData = this.props.rData

        return(
            <div>
                <PageHeader
                    style={{height:50}}
                    title= {realationshipData.length>0?realationshipData[0]+"和"+realationshipData[1]:"请进行关系检索"}
                    subTitle={realationshipData[4]}
                >
                    <Paragraph>
                        {realationshipData[2]}
                    </Paragraph>
                    <Paragraph>
                        {realationshipData[3]}
                    </Paragraph>
                </PageHeader>
                <CenterGraph realationshipData1={realationshipData[0]} realationshipData2={realationshipData[1]} rData={rData}/>
            </div>
        )
    }
}

export default CenterArea;