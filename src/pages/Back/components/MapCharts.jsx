import React,{ Component } from 'react';
import * as echarts from 'echarts';
import mapData from '../map.js'

class mapCharts extends Component {
  componentDidMount(){
    const myChart = echarts.init(document.getElementById('main'));
    this.handleOptions(myChart)
  }

  handleOptions = (myChart) => {
    let lines = mapData.map(function (track) {
      return {
        coords: track.map(function (seg, idx) {
          return seg.coord;
        })
      };
    });

    const option={
      bmap: {
        center: [120.13066322374,30.240018034923],
        zoom: 14,
        roam: true,
        mapStyle: {
          styleJson: [{
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          },{
            'featureType': 'land',
            'elementType': 'all',
            'stylers': {
              'color': '#f3f3f3'
            }
          },{
            'featureType': 'railway',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },{
            'featureType': 'highway',
            'elementType': 'all',
            'stylers': {
              'color': '#fdfdfd'
            }
          },{
            'featureType': 'highway',
            'elementType': 'labels',
            'stylers': {
              'visibility': 'off'
            }
          },{
            'featureType': 'arterial',
            'elementType': 'geometry',
            'stylers': {
              'color': '#fefefe'
            }
          },{
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#fefefe'
            }
          },{
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },{
            'featureType': 'green',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },{
            'featureType': 'subway',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },{
            'featureType': 'manmade',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          },{
            'featureType': 'local',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          },{
            'featureType': 'arterial',
            'elementType': 'labels',
            'stylers': {
              'visibility': 'off'
            }
          },{
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#fefefe'
            }
          },{
            'featureType': 'building',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          },{
            'featureType': 'label',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#999999'
            }
          }]
        }
      },
      series: [{
        type: 'lines',
        coordinateSystem: 'bmap',
        data: lines,
        polyline: true,
        lineStyle: {
          color: 'purple',
          opacity: 0.6,
          width: 1
        }
      }]
    }
    myChart.setOption(option);
  }

  render(){
    return (
      <div id="main" style={{ width: '100%',height: '600px' }}></div>
    )
  }

}

export default mapCharts;
