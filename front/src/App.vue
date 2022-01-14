<template>
  <div id="app">
    <div class="container">
      <left-nav-bar></left-nav-bar>
      <div class="remote_item">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNavBar from "../src/components/common/leftnavbar/LeftNavBar";
export default {
  name: "App",
  components: {
    LeftNavBar,
  },
  data() {
    return {
   
    };
  },
  methods: {
   
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
.container {
  display: flex;
}
.remote_item {
  flex: 1;
  margin-left: 15px;
  overflow: hidden;
}
@import "assets/css/base.css";
</style>
