import request from '@/utils/request';

const baseUrl = 'http://gzknowledge.cn:2222/';

export async function knowledgeSearch(payload) {
  let url = `/api/knowledgeSearch/getkeyword`;
  const data = {
    body: payload,
    method: 'POST',
  };
  if (payload != null) {
    url += `?keyword=${payload}`;
    return request(url, data);
  }
}

export async function attributeSearch(payload) {
  let url = `/api/knowledgeSearch/getAttribute`;
  const data = {
    body: payload,
    method: 'POST',
  };
  if (payload != null) {
    url += `?subject=${payload}`;
    return request(url, data);
  }
}

export async function substanceSearch(payload) {
  let url = `/api/lucene/getkeyword`;
  const data = {
    body: payload,
    method: 'POST',
  };
  if (payload != null) {
    url += `?keyword=${payload}`;
    return request(url, data);
  }
}
