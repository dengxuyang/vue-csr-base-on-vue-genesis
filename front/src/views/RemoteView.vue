<template>
  <div>
    <!-- :clientFetch="() => clientFetch(ssrname)"
            :serverFetch="() => serverFetch(ssrname)" -->
    <remote-view v-if="ssrname" :key="ssrname" :fetch="() => fetch(ssrname)" />
  </div>
</template>

<script>
import { RemoteView } from "@fmfe/genesis-remote";
import axios from "axios";
export default {
  components: {
    RemoteView,
  },
  computed: {
    ssrname() {
      console.log(this.$route.meta.ssrname);
      return this.$route.meta.ssrname;
    },
  },
  methods: {
    // async fetch(name) {
    //   // 调用其它服务的组件
    //   const res = await axios.get(`/${name}/loadview`);
    //   console.log(1122);
    //   if (res.status === 200) {
    //     return res.data;
    //   }
    //   return null;
    // },
    async fetch(ssrname) {
      // 调用其它服务的组件
      const res = await axios.get(`/view/load`, {
        params: {
          renderUrl: "/" + ssrname,
        },
      });
      if (res.status === 200) {
        return res.data;
      }
      return null;
    },
  },
};
</script>

<style>
</style>