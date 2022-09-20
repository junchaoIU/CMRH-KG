import React, { Component } from 'react';
import * as echarts from 'echarts';
import categories from '../../Common/chartsCategory';

class charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.chartsData,
    };
  }

  componentDidMount() {
    const myChart = echarts.init(document.getElementById('main'));
    this.handleOptions(myChart);
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      if (nextProps.chartsData !== this.props.chartsData) {
        this.setState({
          data: nextProps.chartsData,
        });
      }
    }, 200);
  }

  handleOptions(myChart) {
    if (
      this.state.data &&
      this.state.data.nodes &&
      this.state.data.nodes.length > 0 &&
      this.state.data.links !== null
    ) {
      this.state.data.nodes.forEach((node) => {
        node.symbolSize = 45;
        node.draggable = true;
        node.label = {
          show: true,
        };
        node.name = node.id;
        node.value = node.id;
        node.itemStyle = {
          opacity: 0.8,
        };
        if (node.category === '时间') {
          node.value = node.id.substr(1);
        }
      });
      this.state.data.links.forEach((link) => {
        link.label = {
          show: true,
          formatter: link.category,
        };
        link.tooltip = {
          show: true,
          formatter(a) {
            return `${a.name}：${link.category}`;
          },
        };
        link.lineStyle = {
          color: '#2f4554',
          normal: {
            opacity: 0.8,
          },
        };
        link.symbol = ['circle', 'arrow'];
        link.symbolSize = 10;
      });
      myChart.setOption({
        animation: false,
        // 图的标题
        title: {
          text: this.props.propSearch,
          subtext: '实体知识图谱',
          top: 'center',
          right: 'left',
        },
        // 工具箱
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            restore: { show: true },
          },
        },
        tooltip: {
          show: false,
        },
        legend: {
          show: true,
          data: ['人物', '历史事件', '旧址文物', '文书条款', '时间', '地点', '事件标识'],
        },
        series: [
          {
            name: '实体',
            type: 'graph', // 类型:关系图
            layout: 'force', // 图的布局，类型为力导图
            force: {
              // 斥力因子
              repulsion: 150,
              // 向中心的引力因子
              gravity: 0.1,
              // 边长
              edgeLength: 150,
              friction: 0.6,
            },
            label: {
              position: 'inside',
              formatter: '{c}',
              fontSize: 13,
              fontFamily: 'Courier New',
            },
            // 联动高亮
            legendHoverLink: true,
            focusNodeAdjacency: true,
            // 数据
            data: this.state.data.nodes,
            edges: this.state.data.links,
            categories,
          },
        ],
      });
      myChart.on('click', (params) => {
        const word = [];
        word.push(params.name);
        this.props.clickWord(word);
      });
    }
  }

  render() {
    return (
      <div>
        <div id="main" style={{ width: '100%', height: '600px' }}></div>
      </div>
    );
  }
}

export default charts;
