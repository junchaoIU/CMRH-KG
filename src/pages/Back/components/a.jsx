import React, { PureComponent } from 'react';
import * as echarts from 'echarts';
import geoJson from '../map.json';

class mapCharts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.childEvents,
    };
  }

  componentDidMount() {
    const myChart = echarts.init(document.getElementById('main'));
    this.handleOptions(myChart);
  }
  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      if (nextProps.childEvents !== this.props.childEvents) {
        this.setState({
          data: nextProps.childEvents,
        });
      }
    }, 200);
  }
  handleOptions = (myChart) => {
    const {
      data: { series },
    } = this.state;
    const positionData = [];
    const maxL = [];
    series.map((item) => {
      const longitude = item[0][2].split(',');
      longitude.push(`${item[0][1]}`);
      maxL.push(longitude[0]);
      positionData.push(longitude);
    });
    const center = positionData[0].slice(0, -1);
    echarts.registerMap('route', geoJson);
    // const positionData = [
    //   [127.2808389302688, 42.30988722890512, '吉林省白山市抚松县'],
    //   [125.94983637920117, 42.890404601870685, '西兴隆互通S至一座营互通门架'],
    //   [125.913469599092, 41.43548701609915, '清河互通至五女峰互通门架'],
    //   [123.85247350046755, 43.913703494916476, '兴隆互通至新安互通门架'],
    // ];
    const len = positionData.length - 1;
    const coorData = [];
    positionData.forEach((item) => {
      const cooritem = [item[0], item[1]];
      coorData.push(cooritem);
    });
    myChart.setOption({
      backgroundColor: '#013954', // #013954,
      geo: {
        map: 'route',
        show: true,
        aspectScale: 0.75, // 长宽比
        center, // 当前视角的中心点
        zoom: 3, // 当前视角的缩放比例
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
        silent: true, //鼠标经过地图不高亮
      },
      series: [
        {
          //首尾涟漪效果
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
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              offset: [15, 0],
              color: '#1DE9B6',
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: '#1DE9B6',
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          symbol: 'circle',
          symbolSize: 16,
          data: [
            {
              value: coorData[0],
              itemStyle: {
                color: '#4ab2e5',
              },
            },
            {
              value: coorData[len],
            },
          ],
        },
        {
          //地图线的动画效果
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 25, //箭头指向速度，值越小速度越快
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
          label: {},
          data: [
            {
              coords: coorData,
              lineStyle: {
                color: '#4ab2e5',
              },
            },
          ],
        },
        {
          //气泡点
          type: 'scatter',
          symbol: 'pin',
          symbolSize: 24,
          zlevel: 3,
          label: {
            show: false,
            formatter: (param) => {
              return param.value[2];
            },
            fontSize: 12,
            position: [15, 15],
            borderWidth: 1,
            borderColor: '#1c7baf',
            borderRadius: 4,
            color: '#fff',
            padding: [5, 10],
          },
          emphasis: {
            label: {
              backgroundColor: '#0c4fff',
            },
          },
          itemStyle: {
            color: 'lightskyblue',
          },
          coordinateSystem: 'geo',
          data: positionData,
        },
      ],
    });
  };

  render() {
    return <div id="main" style={{ width: '100%', height: '598px' }}></div>;
  }
}

export default mapCharts;
