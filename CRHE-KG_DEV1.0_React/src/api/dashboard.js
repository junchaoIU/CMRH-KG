import request from '@/utils/request'
export function countList() {
    return request({
        url: '/count/getCount',
        method: 'get',
    })
}