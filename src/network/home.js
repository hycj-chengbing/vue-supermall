import request from "./request";//没有default 导出要加{}

export function getHomeMultidata() {
    return request.get('/home/multidata')
}


export function getHomeGoods(type, page) {
    return request.get('/home/data', {
        params: {
            type,
            page
        }
    });
}