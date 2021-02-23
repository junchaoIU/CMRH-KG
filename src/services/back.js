import request from '@/utils/request';
export async function getAllEvent() {
  return request('/api/eventReminiscence/getAllEvent');
}

