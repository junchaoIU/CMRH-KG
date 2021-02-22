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
export async function getTime(payload){
  let url = '/api/timeSpaceSearch/getTime';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?time=${payload}`;
    return request(url,data);
  }
}
export async function getPeriodTimeRecallDetail(payload){
  let url = '/api/timeSpaceSearch/getPeriodTimeRecallDetail';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?time1=${payload.time1}&time2=${payload.time2}`;
    return request(url,data);
  }
}

export async function getPeriodTime(payload){
  let url = '/api/timeSpaceSearch/getPeriodTime';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?time1=${payload.time1}&time2=${payload.time2}`;
    return request(url,data);
  }
}
export async function getSpaceRecallDetail(payload){
  let url = '/api/timeSpaceSearch/getSpaceRecallDetail';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?space=${payload}`;
    return request(url,data);
  }
}
export async function getSpace(payload){
  let url = '/api/timeSpaceSearch/getSpace';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?space=${payload}`;
    return request(url,data);
  }
}

export async function getTimeSpaceRecallDetail(payload){
  let url = '/api/timeSpaceSearch/getTimeSpaceRecallDetail';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?space=${payload.space}&time=${payload.time}`;
    return request(url,data);
  }
}

export async function getTimeSpace(payload){
  let url = '/api/timeSpaceSearch/getTimeSpace';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?space=${payload.space}&time=${payload.time}`;
    return request(url,data);
  }
}
