import React from "react";
import CenterGraph from "./CenterGraph";

class CenterArea extends React.Component{

    getChildrenParram = (parram) => {
        this.props.parent.getParram(parram)
    }

    render(){
        let rData = this.props.rData
        let parram = this.props.parram
        return(
            <div>
                <CenterGraph rData={rData} parram={parram} parent={this}/>
            </div>
        )
    }
}

export default CenterArea;