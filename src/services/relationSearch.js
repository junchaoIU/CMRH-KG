import request from '@/utils/request';
export async function relationSearch(payload) {
  let url= '/api/relationSearch/getPeople';
  if(payload != null) {
    url += `?object=${payload.object}&subject=${payload.subject}`;
    return request(url,payload);
  }
}
