import React, { Component } from "react";
import { connect } from "react-redux";
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";

class Backechart extends Component {
    state = {
        chart: null,
    };

    componentDidMount() {
        debounce(this.initChart.bind(this), 300)();
        window.addEventListener("resize", () => this.resize());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
            this.resize();
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
    setOptions() {
        const dataList=[
            { name: '广州市', value: 1350 },
            { name: '深圳市', value: 1190 },
            { name: '珠海市', value: 167 },
            { name: '汕头市', value: 555 },
            { name: '佛山市', value: 743 },
            { name: '韶关市', value: 293 },
            { name: '湛江市', value: 724 },
            { name: '肇庆市', value: 405 },
            { name: '江门市', value: 451 },
            { name: '茂名市', value: 608 },
            { name: '惠州市', value: 475 },
            { name: '梅州市', value: 434 },
            { name: '汕尾市', value: 302 },
            { name: '河源市', value: 307 },
            { name: '阳江市', value: 251 },
            { name: '清远市', value: 383 },
            { name: '东莞市', value: 825 },
            { name: '中山市', value: 320 },
            { name: '潮州市', value: 264 },
            { name: '揭阳市', value: 605 },
            { name: '云浮市', value: 246 }
        ];

        const yName = [];
        const datas = [];
        for (let i = 0; i < 21; i++) {
            let d = {
                name: dataList[i].name,
                value: dataList[i].value
            }
            datas.push(d);
        }
        function NumDescSort(a, b) {
            return a.value - b.value;
        }
        datas.sort(NumDescSort);
        for (let i = 0; i < 21; i++) {
            yName.push(datas[i].name);
        }
        const mapdata = [{
            type: 'map',
            map: '广东',
            left: '20%',
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: datas
        }];

        const option ={
            title: {
                text: '',
                subtext: '数据来源网络(单位：亿元)',
                left: 'center',
                textStyle: {
                    color: '#000'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c}亿元"
            },
            //左侧工具栏
            visualMap: {
                min: 160,
                max: 1350,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['skyblue', 'yellow', 'orangered']
                },
                dimension: 0
            },

            grid: {
                default:false,
                x: '0%',
                y: '0%',
                width: '0%',
                height: '0%'
            },

            xAxis: {
                default:false,
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            yAxis: {
                default:false,
                type: 'category',
                data: yName,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },

            series: mapdata
        };
        this.state.chart.setOption(option);
    }

    initChart() {
        if (!this.el) return;
        this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
            this.setOptions();
        });
    }

    render() {
        return (
            <div
                style={{ width: "100%", height: "calc(100vh - 100px)" }}
                className="app-container"
            >
                <div
                    style={{ width: "100%", height: "100%" }}
                    ref={(el) => (this.el = el)}
                ></div>
            </div>
        );
    }
}

export default connect((state) => state.app)(Backechart);