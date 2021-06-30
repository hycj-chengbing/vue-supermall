import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-type'
export default {

    // mutations唯一的目的就是修改state中的状态，里面的方法完成的事件比较单一
    [ADD_COUNTER](state, payload) {
        payload.count += 1
    },
    [ADD_TO_CART](state, payload) {
        payload.checked=true
        state.cartList.push(payload)
    }
}