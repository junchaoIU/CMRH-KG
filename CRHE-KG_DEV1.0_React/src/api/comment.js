import request from '@/utils/request'
export function commentList() {
    return request({
        url: '/comment/getAllComment',
        method: 'get',
    })
}

export function commentAdd(auther,avatar,content) {
    return request({
        url: '/comment/insertComment?auther='+auther+'&avatar='+avatar+'&content='+content,
        method: 'post',
    })
}