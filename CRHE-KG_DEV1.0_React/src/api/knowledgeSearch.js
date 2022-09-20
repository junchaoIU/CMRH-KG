import request from '@/utils/request'
export function treeList() {
    return request({
        url: '/catalog.js',
        method: 'get',
    })
}

export function optionList(data) {
    return request({
        url: 'knowledgeSearch/getIndistinct?keyword='+data,
        method: 'post',
        data
    })
}

export function luceneList(data) {
    return request({
        url: '/lucene/getKeyword?keyword='+data,
        method: 'post',
        data
    })
}

export function keywordList(data) {
    return request({
        url: '/knowledgeSearch/getkeyword?keyword='+data,
        method: 'post',
        data
    })
}

export function attributekList(data) {
    return request({
        url: '/knowledgeSearch/getAttribute?subject='+data,
        method: 'post',
        data
    })
}


