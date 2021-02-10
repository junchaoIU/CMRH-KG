import request from '@/utils/request';
export async function eventCharts() {
  const url= 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/hangzhou-tracks.json';
    return request(url);
}
