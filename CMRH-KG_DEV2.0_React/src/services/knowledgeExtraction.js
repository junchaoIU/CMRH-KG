import request from '@/utils/request2';

export async function informationExaction(payload) {
  let url = `/api2/webKG/informationExaction`;
  const data = {
    method: 'GET',
  };
  if (payload != null) {
    url += `?entity=${payload}`;
    return request(url, data);
  }
}

export async function getProcessNum(payload) {
  let url = `/api2/webKG/getProcess`;
  const data = {
    method: 'GET',
  };
  if (payload != null) {
    url += `?entity=${payload}`;
    return request(url, data);
  }
}

export async function txtExtraction(payload) {
  let url = `/api2/bookKG/txtExtraction`;
  const data = {
    method: 'GET',
  };
  if (payload != null) {
    url += `?content=${payload}`;
    return request(url, data);
  }
}

//
// export async function attributeSearch(payload) {
//   let url = `/api/knowledgeSearch/getAttribute`;
//   const data = {
//     body: payload,
//     method: 'POST',
//   };
//   if (payload != null) {
//     url += `?subject=${payload}`;
//     return request(url, data);
//   }
// }
//
// export async function substanceSearch(payload) {
//   let url = `/api/lucene/getkeyword`;
//   const data = {
//     body: payload,
//     method: 'POST',
//   };
//   if (payload != null) {
//     url += `?keyword=${payload}`;
//     return request(url, data);
//   }
// }
