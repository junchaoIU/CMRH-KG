import request from '@/utils/request'
export function peopleList(data) {
    return request({
        url: '/peopleReminiscence/getPeople?people='+data,
        method: 'post',
        data
    })
}

export function ThingList(data) {
    return request({
        url: '/eventReminiscence/getChildEvent?event='+data,
        method: 'post',
        data
    })
}

export function ThingLine() {
    return request({
        url: '/eventReminiscence/getAllEvent',
        method: 'get',
    })
}

