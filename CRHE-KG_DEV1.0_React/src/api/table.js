import request from '@/utils/request'
export function tableList() {
  return request({
    url: '/book/getAllBook',
    method: 'get',
  })
}

export function deleteItem(data) {
  return request({
    url: '/book/deleteBook?book='+data,
    method: 'delete',
    data
  })
}

export function ImageList() {
  return request({
    url: '/book/getAllImage',
    method: 'get',
  })
}

export function deleteImage(data) {
  return request({
    url: '/book/deleteBook?image='+data,
    method: 'delete',
    data
  })
}
