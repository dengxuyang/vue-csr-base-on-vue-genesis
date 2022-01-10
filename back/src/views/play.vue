<template>
  <div class="app1">
    {{ msg }}
    <ul v-for="(item,index) in this.list" :class="{listyle:index%2==0}" :key="index">
      <li> {{item.ticketCategoryName}}</li>
    </ul>
  </div>
</template>
<script lang="js">
import Vue from "vue";
import axios from "axios";
export default Vue.extend({
  name: "play",
  data() {
    return {
      msg: "这是服务端的---------  play",
      list:[]
    };
  },
  mounted() {
    this.getData()
  },
  watch: {},
  methods: {
     getData() {
      let url =
        "http://localhost:3000/api/getData";
      axios.get(url).then((result) => {
        this.list=result.data
         console.log(result);
         
     }).catch((err) => {
       
     });;
    
      
    },
  },
});
</script>
<style lang="less" scoped>
.listyle{
  background-color: antiquewhite;
}
</style>
