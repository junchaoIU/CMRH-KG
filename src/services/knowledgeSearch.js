import request from '@/utils/request';
export async function knowledgeSearch(payload) {
  let url= '/api/knowledgeSearch/getkeyword';
  const data = {
    body: payload,
    method: "POST"
  };
    if(payload != null) {
    url += `?keyword=${payload}`;
      return request(url,data);
    }
}
export async function attributeSearch(payload) {
  let url= '/api/knowledgeSearch/getAttribute';
  const data = {
    body: payload,
    method: "POST"
  };
  if(payload != null) {
    url += `?subject=${payload}`;
    return request(url,data);

  }
}
