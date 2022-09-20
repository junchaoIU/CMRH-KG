import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";

class Backechart extends Component {


    constructor(props) {
        super(props);
        console.log(this.props)
    }
    static propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
        className: PropTypes.string,
        styles: PropTypes.object,
    };
    static defaultProps = {
        width: "100%",
        height: "600px",
        styles: {},
        className: "",
    };
    state = {
        chart: null,
        interval:null
    }

    componentDidMount() {
        console.log(this.props)
        debounce(this.initChart.bind(this), 600)();
        window.addEventListener("resize", () => this.resize());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
            this.resize();
        }
        if (nextProps.centerData !== this.props.centerData) {
            debounce(this.initChart.bind(this), 600)();
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.dispose();
    }

    componentWillUnmount() {
        this.resize()
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

    setOptions(centerData) {
        const data = centerData
        console.log(data)
        if(data){
            //const data2={counties:["孙中山",],series:[[["1866-01-21", "广东","孙中山", "孙中山出生于广东"]],[["1878-02-04", "美国夏威夷","孙中山", "12岁的孙中山随母赴檀香山"]],[["1883-02-04", "香港","孙中山", "17岁的孙中山自檀香山归国，\n同年前往香港读书"]],[["1887-02-04", "香港", "孙中山", "孙中山毕业于香港西医书院"]],[["1892-02-04", "广东", "孙中山", "26岁的孙中山来到澳门镜湖医院，\n出任新设的西医局首任义务医师，\n成为澳门的第一位华人西医"]]]}
            var series = data.series;
            const option = {
                visualMap: {
                    show: false,
                    min: 0,
                    max: 100,
                    dimension: 1
                },
                legend: {
                    data: data.counties,
                    selectedMode: 'single',
                    right: 100
                },
                grid: {
                    left: 0,
                    bottom: 40,
                    containLabel: true,
                    top: 30
                },
                xAxis: {
                    type: 'category',
                    splitLine: {
                        show: true
                    },
                    boundaryGap: ['20%', '20%']
                },
                yAxis: {
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                },
                toolbox: {
                    padding:30,
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        //敲黑板，重点！！！
                        myTool2:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                            show:true,//是否显示
                            title:'开始播放', //鼠标移动上去显示的文字
                            icon:'path://M429.646454 687.977369a57.331447 57.331447 0 0 0 27.277699 7.000472 60.348892 60.348892 0 0 0 32.829797-10.017916l175.977369-115.990571a68.677039 68.677039 0 0 0 30.777935-58.055634 66.504479 66.504479 0 0 0-29.812353-56.486563l-177.54644-115.749175a57.934936 57.934936 0 0 0-60.348892-3.017445 67.832155 67.832155 0 0 0-33.312588 60.348893V627.628477a67.470061 67.470061 0 0 0 34.157473 60.348892z', //图标
                            onclick:()=> {//点击事件,这里的option1是chart的option信息
                                if(this.props.centerData.series.length>0){
                                    let start = 0; //播放所在下标
                                    const chart = echarts.init(this.el, "macarons")
                                    const series = this.props.centerData.series
                                    let end = (100/series.length)*2; //播放所在下标
                                    this.state.interval = setInterval(()=>{
                                        chart.dispatchAction({
                                            type: 'dataZoom',
                                            dataZoomIndex: 0,
                                            start: start,
                                            end: end,
                                        });
                                        if(end <= 100) {
                                            start+=(100/series.length);
                                            end+=(100/series.length);
                                        }else{
                                            clearInterval(this.state.interval)
                                        }
                                    }, this.props.speed);
                                }
                            }
                        },
                        myTool3:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                            show:true,//是否显示
                            title:'停止', //鼠标移动上去显示的文字
                            icon:'path://M514 114.3c-219.9 0-398.9 178.9-398.9 398.8 0.1 220 179 398.9 398.9 398.9 219.9 0 398.8-178.9 398.8-398.9 0-219.8-178.9-398.8-398.8-398.8z m-35.6 531.5c0 32.5-26.3 58.8-58.8 58.8s-58.8-26.3-58.8-58.8V381.4c0-32.5 26.3-58.8 58.8-58.8s58.8 26.3 58.8 58.8v264.4z m188.7 0c0 32.5-26.3 58.8-58.8 58.8s-58.8-26.3-58.8-58.8V381.4c0-32.5 26.3-58.8 58.8-58.8s58.8 26.3 58.8 58.8v264.4z', //图标
                            onclick:()=> {
                                clearInterval(this.state.interval)
                            }
                        }
                    }
                },

                dataZoom:[
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        start: 0,
                        end: (100/series.length)*2,
                        height: 15,
                        bottom: 10,
                        borderColor: 'transparent',
                        backgroundColor: '#7FDBFF',
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                        handleSize: 20,
                    },
                    {
                        type: 'slider',
                        show: true,
                        yAxisIndex: [0],
                        width: 20,
                        backgroundColor: '#7FDBFF',
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                        start: 0,
                        end: 100
                    },
                ],
                series: []
            };
            data.counties.forEach(function (country) {
                var data = series.map(function (yearData) {
                    var item = yearData.filter(function (item) {
                        return item[2] === country;
                    })[0];

                    return {
                        label: {
                            show: true,
                            position: 'bottom'
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        name: item[3],
                        value: item
                    };
                });
                var links = data.map(function (item, idx) {
                    return {
                        source: idx,
                        target: idx + 1
                    };
                });
                links.pop();
                console.log(data)
                console.log(links)

                option.series.push({
                    name: country,
                    type: 'graph',
                    layout: 'none',
                    coordinateSystem: 'cartesian2d',
                    data: data,
                    links: links,
                    legendHoverLink:false,

                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: 10,
                    lineStyle: {
                        color: '#333'
                    },
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#333'
                    },
                    label: {
                        color: '#333',
                        position: 'right',
                    },
                    symbolSize: 30,
                    animation:true,
                    animationDelay: function (idx) {
                        // 越往后的数据延迟越大
                        return idx * 100;
                    }
                });
            });
            this.state.chart.setOption(option);
        }else{
            this.state.chart. dispose()
        }
    }

    initChart() {
        if (!this.el) return;
        this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
            console.log(this.props.centerData)
            this.setOptions(this.props.centerData);
        });
    }

    render() {
        const { className, height, width, styles } = this.props;
        return (
            <div>
                <div
                    className={className}
                    ref={(el) => (this.el = el)}
                    style={{
                        ...styles,
                        height,
                        width,
                    }}
                />
            </div>
        )
    }
}

export default connect((state) => state.app)(Backechart);