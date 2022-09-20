import request from '@/utils/request'

export function luceneList(data) {
    return request({
        url: '/lucene/getkeyword?keyword='+data,
        method: 'post',
        data
    })
}

export function luceneSemanticList(data) {
    return request({
        url: '/lucene/getkeyword?keyword='+data,
        method: 'post',
        data
    })
}

export function lucene2List(data) {
    return request({
        url: '/lucene/getkeyword2?keyword='+data,
        method: 'post',
        data
    })
}