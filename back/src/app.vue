<template>
  <div class="app">
    <!-- 服务端渲染1122212121 -->
    <el-button type="primary" size="default" @click="emitC">切换路由</el-button>
    <!-- {{$store.state.code}} -->
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "app",
  data() {
    return {};
  },
  mounted() {
    
  },
  watch: {},
  methods: {
    clsoe() {},

    emitC() {
     let  curcode:string
      if (this.$route.path == "/video") {
        this.$router.push({ path: "/play" });
        curcode='play'
      } else {
        this.$router.push({ path: "/video" });
         curcode='video'
      }
  this.$root.$emit('my-event', curcode);
      // this.$store.commit('setcode','setdaole')
    },
  },
});
</script>
<style lang="less" scoped>
.app {
  padding: 100px;
  text-align: center;

}
// .text {
//   color: #999;
//   font-size: 14px;
//   cursor: pointer;
// }
// .demo-fit{
//     margin-top: 20px;
// }
</style>
