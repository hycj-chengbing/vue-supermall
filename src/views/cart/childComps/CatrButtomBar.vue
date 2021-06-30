<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-bottom"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ toltalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算 ({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: { CheckButton },
  computed: {
    toltalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {//全部选中
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {//部分或者全部不选中
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick(){
      if(this.checkLength==0){
        this.$toast.show('请选择购买的商品')
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 16px;
  width: 80px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 8px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 120px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>