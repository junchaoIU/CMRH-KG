import React, { PureComponent } from 'react';
import * as echarts from 'echarts';
import geoJson from '../map.json';

class mapCharts extends PureComponent {
  componentDidMount() {
    const myChart = echarts.init(document.getElementById('main'));
    this.handleOptions(myChart);
  }

  handleOptions = (myChart) => {
    echarts.registerMap('haha', geoJson);
    const positionData = [
      [127.2808389302688, 42.30988722890512, '吉林省白山市抚松县'],
      [125.94983637920117, 42.890404601870685, '西兴隆互通S至一座营互通门架'],
      [125.913469599092, 41.43548701609915, '清河互通至五女峰互通门架'],
      [123.85247350046755, 43.913703494916476, '兴隆互通至新安互通门架'],
    ];
    const len = positionData.length - 1;
    const coorData = [];
    positionData.forEach((item) => {
      const cooritem = [item[0], item[1]];
      coorData.push(cooritem);
    });
    myChart.setOption({
      backgroundColor: '#013954', // #013954,
      geo: {
        map: 'haha',
        show: true,
        aspectScale: 0.75, //长宽比
        zoom: 1,
        roam: 'scale',
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
            period: 8, //箭头指向速度，值越小速度越快
            trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol:
              'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
            symbolSize: 17, //图标大小
          },
          lineStyle: {
            normal: {
              color: '#1DE9B6',
              width: 3, //线条宽度
              opacity: 1, //尾迹线条透明度
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
            show: true,
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
    return <div id="main" style={{ width: '100%', height: '600px' }}></div>;
  }
}

export default mapCharts;
