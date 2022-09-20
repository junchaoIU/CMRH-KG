import request from '@/utils/request'
//时间
export function timeList(data) {
    return request({
        url: '/timeSpaceSearch/getTime?time='+data,
        method: 'post',
        data
    })
}
//时间段
export function timesList(data1,data2) {
    return request({
        url: '/timeSpaceSearch/getPeriodTime?time1='+data1+'&time2='+data2,
        method: 'post',
    })
}
//地点
export function spaceList(data) {
    return request({
        url: '/timeSpaceSearch/getSpace?space='+data,
        method: 'post',
        data
    })
}
//时空
export function timespaceList(data1,data2) {
    return request({
        url: '/timeSpaceSearch/getTimeSpace?space='+data2+'&time='+data1,
        method: 'post',
    })
}

//时间线
export function timeCommentList(data) {
    return request({
        url: '/timeSpaceSearch/getTimeRecallDetail?time='+data,
        method: 'post',
        data
    })
}

//时间段线
export function timesCommentList(data1,data2) {
    return request({
        url: '/timeSpaceSearch/getPeriodTimeRecallDetail?time1='+data1+'&time2='+data2,
        method: 'post',
    })
}

//地点线
export function spaceCommentList(data) {
    return request({
        url: '/timeSpaceSearch/getSpaceRecallDetail?space='+data,
        method: 'post',
        data
    })
}

//时空线
export function timespaceCommentList(data1,data2) {
    return request({
        url: '/timeSpaceSearch/getTimeSpaceRecallDetail?space='+data2+ '&time='+ data1,
        method: 'post',
    })
}