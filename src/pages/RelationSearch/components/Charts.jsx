import React, { Component } from 'react';
import * as echarts from 'echarts';
import categories from '../../Common/chartsCategory';

class charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectLinks: props.objectLinks,
      subjectLinks: props.subjectLinks,
      getPeople: props.getPeople,
    };
  }

  componentDidMount() {
    const myChart = echarts.init(document.getElementById('main'));
    this.handleData(myChart);
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      if (
        nextProps.objectLinks !== this.props.objectLinks ||
        nextProps.subjectLinks !== this.props.subjectLinks ||
        nextProps.getPeople !== this.props.getPeople
      ) {
        this.setState({
          objectLinks: nextProps.objectLinks,
          subjectLinks: nextProps.subjectLinks,
          getPeople: nextProps.getPeople,
        });
      }
    }, 200);
  }

  handleData(myChart) {
    const { objectLinks, subjectLinks, getPeople } = this.state;
    const links = [];
    let nodes = [];
    if (objectLinks.links !== null && subjectLinks.links !== null) {
      for (let i = 0; i < objectLinks.links.length; i++) {
        for (let j = 0; j < subjectLinks.links.length; j++) {
          if (subjectLinks.links[j].target === objectLinks.links[i].target) {
            links.push(subjectLinks.links[j]);
            links.push(objectLinks.links[i]);
          }
        }
      }
      for (let i = 0; i < objectLinks.links.length; i++) {
        if (objectLinks.links[i].target === subjectLinks.links[0].source) {
          links.push(objectLinks.links[i]);
        }
      }
      for (let i = 0; i < subjectLinks.links.length; i++) {
        if (subjectLinks.links[i].target === objectLinks.links[0].source) {
          links.push(subjectLinks.links[i]);
        }
      }
      if (objectLinks.length !== 0 && objectLinks.nodes[0].id) {
        for (let i = 0; i < links.length; i++) {
          for (let j = 0; j < objectLinks.nodes.length; j++) {
            if (links[i].target === objectLinks.nodes[j].id) {
              nodes.push(objectLinks.nodes[j]);
            }
          }
        }
      }
      nodes = [...new Set(nodes)];
    } else {
      if (objectLinks.links !== null) {
        for (let i = 0; i < objectLinks.links.length; i++) {
          if (objectLinks.links[i].target === getPeople[0].object) {
            links.push(objectLinks.links[i]);
          }
        }
        for (let j = 0; j < objectLinks.nodes.length; j++) {
          if (getPeople[0].object === objectLinks.nodes[j].id) {
            nodes.push(objectLinks.nodes[j]);
          }
          if (getPeople[0].subject === objectLinks.nodes[j].id) {
            nodes.push(objectLinks.nodes[j]);
          }
        }
      }

      if (subjectLinks.links !== null) {
        for (let i = 0; i < subjectLinks.links.length; i++) {
          if (subjectLinks.links[i].target === getPeople[0].object) {
            links.push(subjectLinks.links[i]);
          }
        }
        for (let j = 0; j < subjectLinks.nodes.length; j++) {
          if (getPeople[0].object === subjectLinks.nodes[j].id) {
            nodes.push(subjectLinks.nodes[j]);
          }
          if (getPeople[0].subject === subjectLinks.nodes[j].id) {
            nodes.push(subjectLinks.nodes[j]);
          }
        }
      }
    }
    this.handleOptions(myChart, nodes, links);
  }

  handleOptions(myChart, nodes, links) {
    nodes.forEach((node) => {
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
    links.forEach((link) => {
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
          curveness: 0.2,
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
        subtext: '实体关系知识图谱',
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
          data: nodes,
          edges: links,
          categories,
        },
      ],
    });
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
