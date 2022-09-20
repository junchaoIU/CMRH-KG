import request from '@/utils/request';
export async function getAllEvent() {
  return request('/api/eventReminiscence/getAllEvent');
}
export async function getChildEvent(payload) {
  let url= '/api/eventReminiscence/getChildEvent';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?event=${payload}`;
    return request(url,data);
  }
}

export async function getPeople(payload) {
  let url= '/api/peopleReminiscence/getPeople';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?people=${payload}`;
    return request(url,data);
  }
}
