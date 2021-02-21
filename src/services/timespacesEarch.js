import request from '@/utils/request';

export async function getTimeRecallDetail(payload){
  let url = '/api/timeSpaceSearch/getTimeRecallDetail';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?time=${payload}`;
    return request(url,data);
  }
}
