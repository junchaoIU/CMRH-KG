import request from '@/utils/request'
export function luceneList(data) {
    return request({
        url: '/lucene/getSemanticAnalysisKeyword?keyword='+data,
        method: 'post',
        data
    })
}

export function relationResult(data1,data2) {
    return request({
        url: '/relationSearch/getPeople?object=' + data1 + '&subject=' + data2,
        method: 'post',
        data1,data2
    })
}
