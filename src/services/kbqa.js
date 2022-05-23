import request from '@/utils/request';

export async function getQuestion(payload) {
  console.log(payload)
  let url= '/api/kbqa/getQuestion';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?question=${payload}`;
    return request(url,data);
  }
}

