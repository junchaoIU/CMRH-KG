import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";

class CenterGraph extends Component {
    static propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
        className: PropTypes.string,
        styles: PropTypes.object,
    };
    static defaultProps = {
        width: "100%",
        height: "680px",
        styles: {},
        className: "",
    };
    state = {
        chart: null,
        parram:"",
    };

    componentDidMount() {
        console.log(this.props)
        debounce(this.initChart.bind(this), 600)();
        window.addEventListener("resize", () => this.resize());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
            this.resize();
        }
        if (nextProps.chartData !== this.props.rData) {
            debounce(this.initChart.bind(this), 600)();
        }
    }

    componentWillUnmount() {
        this.dispose();
    }

    resize() {
        const chart = this.state.chart;
        if (chart) {
            debounce(chart.resize.bind(this), 300)();
        }
    }

    dispose() {
        if (!this.state.chart) {
            return;
        }
        window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
        this.setState({ chart: null });
    }

    setOptions(rData,cardData) {
        //const data={categories:[{base: "人物",keyword: {},name: "人物"},{base: "事件",keyword: {},name: "事件"}],links:[{source: 0, target: 1}],nodes:[{name: "孙中山", value: 2, category:"人物", id: 0},{name: "广州起义", value: 1, category:"事件", id: 1}]}
        const graph = rData
        console.log(graph)
        //const graph={links:[{source:"孙中山", target:"广州起义",value:"相关事件"},{source:"孙中山", target:"宋庆龄",value:"妻子"}],nodes:[{name: "孙中山", value:"孙中山", category:0,id:"孙中山"},{name: "宋庆龄", value:"宋庆龄", category:0,id:"宋庆龄"},{name: "广州起义", value:"广州起义", category:1, id:"广州起义"}]}
        this.state.chart.hideLoading();
        if(graph){
            console.log("ok")
            graph.nodes.forEach(function (node) {
                node.symbolSize = 40;
                node.draggable = true;
                node.label={
                    show:true
                }
                node.name = node.id;
                node.value = node.id;
                node.itemStyle={
                    borderWidth: 1,
                    borderColor: '#333',
                    opacity:0.8
                }
                if(node.category === '时间'){
                    node.name = node.id.substr(1)
                    node.value = node.id.substr(1)
                }
                if(node.category === '回溯'){
                    node.symbolSize = 30
                    node.label={
                        show:true
                    }
                    console.log(cardData[0])
                    for(let i=0;i<cardData[0].length;i++){
                        console.log(cardData[0][i])
                        if(cardData[0][i][0] === node.id){
                            console.log(node.id)
                            node.name = cardData[0][i][3];
                            node.value = cardData[0][i][3]
                        }
                    }
                }
            });
            graph.links.forEach(function (link) {
                link.lineStyle={
                    color:'#333',
                    normal: {
                        opacity: 0.9,
                        width: 1,
                        //曲度
                        curveness: 0
                    }
                }

                link.symbol=['circle', 'arrow'];
                link.symbolSize=10;
            })
            const option = {
                animation: false,
                //标题
                title: {
                    text: graph.nodes.length>0 ?this.props.parram:"",
                    subtext: graph.nodes.length>0 ?"实体知识图谱":"",
                    top: 'center',
                    left: 'right'
                },
                toolbox: {
                    show:true,
                    feature:{
                        saveAsImage:{},
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                    }
                },
                tooltip: {

                },
                legend: {
                    show: true,
                    data: ['人物', '历史事件', '旧址文物','文书条款','时间','地点','事件标识','回溯']
                },
                series: [{
                    name: '实体',
                    type: 'graph',
                    layout: 'force',
                    force:{
                        //斥力因子
                        repulsion:150,
                        //向中心的引力因子
                        gravity:0.1,
                        //边长
                        edgeLength:150,
                        friction:0.6
                    },
                    label: {
                        position: 'inside',
                        formatter: '{c}',
                    },
                    edgeLabel:{
                        show:true,
                        position:"middle",
                        formatter: '{c}',
                    },
                    //联动高亮
                    legendHoverLink:true,
                    //
                    focusNodeAdjacency:true,
                    data: graph.nodes,
                    edges: graph.links,
                    categories: [{
                        name: '人物',
                        itemStyle: {
                            normal: {
                                color: "#FF4136",
                            }
                        }
                    }, {
                        name: '历史事件',
                        itemStyle: {
                            normal: {
                                color: "#0074D9",
                            }
                        }
                    },{
                        name: '旧址文物',
                        itemStyle: {
                            normal: {
                                color: "#3D9970",
                            }
                        }
                    },{
                        name: '文书条款',
                        itemStyle: {
                            normal: {
                                color: "#FF851B",
                            }
                        }
                    },{
                        name: '事件标识',
                        itemStyle: {
                            normal: {
                                color: "#B10DC9",
                            }
                        }
                    },{
                        name: '时间',
                        itemStyle: {
                            normal: {
                                color: "#85144b",
                            }
                        }
                    },{
                        name: '地点',
                        itemStyle: {
                            normal: {
                                color: "#2ECC40",
                            }
                        }
                    },{
                        name: '回溯',
                        itemStyle: {
                            normal: {
                                color: "#001f3f",
                            }
                        }
                    }]
                }]
            }
            console.log(option)
            this.state.chart.setOption(option);
            this.state.chart.on('click', (param)=> {
                //这个params可以获取你要的图中的当前点击的项的参数
                console.log(param.name)
                this.props.parent.getChildrenParram(param.name)
            });
        }
    }


    initChart() {
        if (!this.el) return;
        this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
            this.setOptions(this.props.rData,this.props.cardData);
        });
    }

    render() {

        const { className, height, width, styles } = this.props;
        return (
            <div
                className={className}
                ref={(el) => (this.el = el)}
                style={{
                    ...styles,
                    height,
                    width,
                }}
            />
        );
    }
}

export default connect((state) => state.app)(CenterGraph);