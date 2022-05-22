<template>
  <div class="cart-list">
    <scroll class="cart-content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // 进来刷新
      this.$refs.scroll.refresh()
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}
.cart-content {
  height: 100%;
  overflow: hidden;
}
</style>