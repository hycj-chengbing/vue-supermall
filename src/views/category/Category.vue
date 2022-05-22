<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">分类</div></nav-bar>

    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <div class="productItem">
        <tab-control
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
          ref="tabControl1"
          class="tab-control1"
          v-show="isTabFixed"
        ></tab-control>
        <scroll
          class="tab-content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
        >
          <div>
            <tab-content
              :categoriesProduct="categoriesProduct"
              @tabContentImageLoad="tabContentImageLoad"
            ></tab-content>
            <tab-control
              ref="tabControl2"
              class="tab-control2"
              :titles="['综合', '新品', '销量']"
              @tabClick="tabClick"
            ></tab-control>
            <tab-content-detail
              :categoryDetail="showCategoryDetail"
            ></tab-content-detail>
          </div>
        </scroll>
      </div>
    </div>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";

import TabMenu from "./childComps/TabMenu";
import TabContent from "./childComps/TabContent";
import TabContentDetail from "./childComps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import { POP, SELL, NEW } from "common/const";
import { tabControlMixin, backTopMixin } from "common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabContent,
    TabControl,
    TabContentDetail,
  },
  mixins: [tabControlMixin, backTopMixin],
  data() {
    return {
      categories: [],
      categoriesProduct: [],
      categoryData: {},
      currentIndex: -1,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },

  mounted() {},
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      // console.log(this.currentType)
      // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType]);
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },

  created() {
    this._getCategory();
  },
  updated() {
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    // console.log(this.tabOffsetTop);
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1.判断BackScroll是否显示
      // console.log(position);
      this.listenShowBackTop(position);
      // 2.固定位置
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    tabContentImageLoad() {
      // 组件没有offsetTop属性，但是可以通过$el获取offsetTop(距离顶部的距离)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },

    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategory(0);
      });
    },
    _getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        this.categoriesProduct = res.data.list;
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
        // console.log(this.categoryData);
      });
    },

    selectItem(index) {
      this._getSubcategory(index);
      this.$refs.scroll.scrollTo(0, 0, 0);
    },
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.message-pass {
  white-space: nowrap;
  width: 375px;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
}
.productItem {
  margin-left: 10px;
  flex: 1;
}
.tab-control1 {
  position: absolute;
  width: 77.5vw;
  z-index: 9;
}

.tab-content {
  height: 100%;
}
</style>