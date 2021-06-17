<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="isStyleActive">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
    },
    isStyleActive: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,//不能写死
    };
  },
  computed: {
    isActive() {
      //看着像函数，其实是属性
      return this.$route.path.indexOf(this.path) !== -1;
      //   那个活跃，$route就是哪个
      // indexOf 表示如果从$route.path里面找到了this.path 就返回1，否则返回-1
    },
    activeStyle() {
      return this.isActive ? { color: this.isactiveStyle} : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
/* item均等分 */
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>