<template>
  <div id="app">
    <div class="container">
      <div>
        <left-nav-bar @menuClick='menuClick'></left-nav-bar>
      </div>
      <div>
        <remote-view ref="remoteCom" :fetch="fetch"  @my-event="myEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import { RemoteView } from "@fmfe/genesis-remote";
import LeftNavBar from "../src/components/common/leftnavbar/LeftNavBar";
import axios from "axios";
export default {
  name: "App",
  components: {
    RemoteView,
    LeftNavBar,
  },
  data(){
    return{
      code:"play"
    }
  },
  methods: {
    async fetch() {
      // 调用其它服务的组件
      const res = await axios.get(`http://localhost:3000/api/${this.code}`,{params:{renderUrl:`/${this.code}`}});
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
      this.$refs.remoteCom.clientLoad()
    },
    myEvent(msg){
     this.code=msg.replace('/','')
       console.log(this.code);
    }
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
.container{
  /* display: flex */
}
@import "assets/css/base.css";
</style>
