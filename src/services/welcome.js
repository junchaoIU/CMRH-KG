import request from '@/utils/request';
export async function homeData() {
  return request('/api/count/getCount');
}
