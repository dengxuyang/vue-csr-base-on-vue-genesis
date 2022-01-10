<template>
  <div id="app">
    <div class="container">
      <div>
         <remote-view  :fetch="fetchVideo"   />
      </div>
    </div>
  </div>
</template>

<script>
import { RemoteView } from "@fmfe/genesis-remote";
// import LeftNavBar from "../src/components/common/leftnavbar/LeftNavBar";
import axios from "axios";
export default {
  name: "App",
  components: {
    RemoteView,
    // LeftNavBar,
  },
  data(){
    return{
      code:"play"
    }
  },
  methods: {
     async fetchVideo() {
      // 调用其它服务的组件
      const res = await axios.get(`http://localhost:3000/api/video`);
      if (res.status === 200) {
        return res.data;
      }
      return null;
    },
   async menuClick(item){
      let {index}=item
      if(this.code==index) return
      this.code=index
    //  this.fetch()
      // this.$refs.remoteCom.clientLoad()
    },
  
  },
};
</script>

<style>

</style>
