<template>
  <div class="app">
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
  },
});
</script>
<style lang="less" scoped>
.app {
  // padding: 100px;
  // text-align: center;
  height: 100%;
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
