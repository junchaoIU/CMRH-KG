import React from "react";
import CenterGraph from "./CenterGraph";
// import {PageHeader,Typography} from 'antd';
// const { Paragraph } = Typography;

class CenterArea extends React.Component{

    render(){
        let rData = this.props.rData
        let parram = this.props.parram
        let cardData = this.props.cardData
        // console.log(parram)
        return(
            <div>
                <CenterGraph rData={rData} cardData={cardData} parram={parram} />
            </div>
        )
    }
}

export default CenterArea;