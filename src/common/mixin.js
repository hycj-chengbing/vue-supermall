import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop.vue";
export const itemListenerMixin = {
  data() {
    return {
      // 监听图片
      itemImageListener: null
    };
  },
  mounted() {
    // 给防抖函数赋值一个新的函数
    let refresh = debounce(this.$refs.scroll.refresh, 50);

    // 接收发射的事件总线,并用监听图片变量保存
    this.itemImageListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImageListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {

      isShowBackTop: false,
    };
  },
  methods: {
    // 回到顶部
    backTop() {
      // 调用子组件里面封装的scrollTo方法即可
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    listenShowBackTop(position){
      this.isShowBackTop= - position.y > 1000
    } 
  }
};
