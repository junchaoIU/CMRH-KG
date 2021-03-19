import React, { Component } from 'react';
import * as echarts from 'echarts';
import geoJson from '../map.json';

class mapCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.childEvents,
    };
  }

  componentDidMount() {
    this.handleOptions();
  }

  componentDidUpdate() {
    this.handleOptions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.childEvents !== this.props.childEvents) {
      this.setState({
        data: nextProps.childEvents,
      });
    }
  }

  handleOptions = () => {
    const myChart = echarts.init(document.getElementById('main'));
    const {
      data: { series },
    } = this.state;
    echarts.registerMap('route', geoJson);
    const geodata = [];
    // 数组对象浅拷贝
    const copy = (obj) => {
      const newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      }
      for (const i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? copy(obj[i]) : obj[i];
      }
      return newobj;
    };
    const first = copy(series);
    const end = copy(series);
    first.pop();
    end.shift();
    // 地图数据结构
    for (let i = 0; i < first.length; i++) {
      if (i === 0) {
        geodata.push({
          date: series[i][0][0],
          geo: [
            { name: series[i][0][1], value: series[i][0][2].split(',', 2), event: series[i][0][4] },
          ],
          moveline: [],
        });
      }
      geodata.push({
        date: end[i][0][0],
        geo: [
          { name: first[i][0][1], value: first[i][0][2].split(',', 2), event: first[i][0][4] },
          { name: end[i][0][1], value: end[i][0][2].split(',', 2), event: end[i][0][4] },
        ],
        moveline: [
          {
            coords: [first[i][0][2].split(',', 2), end[i][0][2].split(',', 2)],
            fromName: first[i][0][1],
            toName: end[i][0][1],
          },
        ],
      });
    }
    console.log(geodata);
    const option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 4000,
          label: {},
          symbol: 'diamond',
          symbolSize: 16,
          data: [],
        },
        title: [
          {
            text: geodata[0].date,
            left: 'center',
            top: 10,
            textStyle: {
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        ],
        backgroundColor: '#013954',
        geo: {
          map: 'route',
          show: true,
          aspectScale: 0.75, // 长宽比
          // center, // 当前视角的中心点
          zoom: 2, // 当前视角的缩放比例
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#1DE9B6',
              },
            },
            emphasis: {
              textStyle: {
                color: 'rgb(183,185,14)',
              },
            },
          },
          itemStyle: {
            normal: {
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: '#09132c', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#072460', // 100% 处的颜色
                  },
                ],
                globalCoord: true, // 缺省为 false
              },
              shadowColor: 'rgb(58,115,192)',
              shadowOffsetX: 1,
              shadowOffsetY: 1,
            },
          },
          silent: true, // 鼠标经过地图不高亮
        },
        series: [
          {
            //首尾涟漪效果
            name: 'light',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
              // 涟漪特效相关配置
              period: 15,
              scale: 4,
              brushType: 'fill',
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#4ab2e5',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
            symbol: 'circle',
            symbolSize: 16,
            data: geodata[0].geo,
          },
          {
            name: '线路',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              period: 5, //箭头指向速度，值越小速度越快
              trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
              color: '#fffa16',
              symbol:
                'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
              symbolSize: 17, //图标大小
            },
            lineStyle: {
              normal: {
                color: '#1DE9B6',
                width: 2, //线条宽度
                opacity: 0.6, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
              },
            },
            polyline: true,
            data: geodata[0].moveline,
          },
        ],
      },
      options: [],
    };

    for (let n = 0; n < geodata.length; n++) {
      option.baseOption.timeline.data.push(geodata[n].date);
      option.options.push({
        title: {
          show: true,
          text: geodata[n].date,
        },
        series: [
          {
            //首尾涟漪效果
            name: 'light',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
              // 涟漪特效相关配置
              period: 15,
              scale: 4,
              brushType: 'fill',
            },
            avoidLabelOverlap: true, // 解决标签重叠
            hoverAnimation: true,
            label: {
              normal: {
                formatter: function (params) {
                  return `${params.name}\n${params.data.event}`;
                },
                lineHeight: 20,
                backgroundColor: '#003F5E',
                borderRadius: 5,
                borderColor: '#67F0EF',
                borderWidth: 1,
                color: '#67F0EF',
                position: 'right',
                offset: [15, 0],
                padding: [4, 8],
                show: true,
                width: 150,
                overflow: 'break',
              },
            },
            labelLayout: function () {
              return {
                x: '30%',
                moveOverlap: 'shiftY',
              };
            },
            labelLine: {
              show: true,
              lineStyle: {
                color: '#bbb',
              },
            },
            itemStyle: {
              normal: {
                color: '#4ab2e5',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
            symbol: 'circle',
            symbolSize: 16,
            data: geodata[n].geo,
          },
          {
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: geodata[n].geo,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: '#F4E925',
              },
            },
          },
          {
            name: '线路',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              period: 5, // 箭头指向速度，值越小速度越快
              trailLength: 0, // 特效尾迹长度[0,1]值越大，尾迹越长重
              color: '#fffa16',
              symbol:
                'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
              symbolSize: 17, // 图标大小
            },
            lineStyle: {
              normal: {
                color: '#1DE9B6',
                width: 2, // 线条宽度
                opacity: 0.6, // 尾迹线条透明度
                curveness: 0.3, // 尾迹线条曲直度
              },
            },
            data: geodata[n].moveline,
          },
        ],
      });
    }
    myChart.setOption(option);
  };

  render() {
    return <div id="main" style={{ width: '100%', height: '598px' }}></div>;
  }
}

export default mapCharts;
