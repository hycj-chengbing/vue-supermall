import {request} from "./request";//没有default 导出要加{}
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}