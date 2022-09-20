import request from '@/utils/request'
export function textList(title,content) {
    return request({
        url: '/uploadText?content='+content+'&title='+title,
        method: 'post',
    })
}