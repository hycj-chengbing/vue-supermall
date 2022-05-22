<template>
  <div id="content">
    <nav-bar class="home-nav">
      <div slot="center">
        <img src="~assets/img/home/LE_logo_2.png" style="width: 100%" alt />
      </div>
    </nav-bar>
 
    <!--内容-->
    <div class="content-body">
      <login></login>
    </div>
    <foot class="foot"></foot>
  </div>
</template>

<script>
import Login from "./childComps/Login";
import foot from "./childComps/foot";
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "LoginPage",
  components: {
    Login,
    NavBar,
    foot,
  },
};
</script>

<style scoped>
@import url("~assets/css/LoginPage.css");
.text-style {
  color: red;
}
.nav-bar {
  height: 62px;
  margin-top: 4px;
}
</style>