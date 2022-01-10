<template>
  <div id="app">
    <div class="container">
      <div>
         <remote-view  :fetch="fetchPlay"   />
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
    async fetchPlay() {
      // 调用其它服务的组件
      const res = await axios.get(`http://localhost:3000/api/play`);
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
    myEvent(msg){
     this.code=msg.replace('/','')
       console.log(this.code);
    }
  },
};
</script>

<style>

</style>
