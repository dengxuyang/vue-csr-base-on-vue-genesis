<template>
  <div>
    <el-tabs
      type="border-card"
      v-loading="loading"
      element-loading-text="拼命加载中"
      v-model="activeName"
      @tab-remove="(name)=>$emit('closeTab',name)"
      @tab-click="(tab)=>$emit('handleTabClick', tab)"
    >
      <el-tab-pane
        :closable="item.closable"
        v-for="(item, index) in tabitem"
        :key="index"
        :name="item.name"
        :label="item.label"
      >
        <slot :name="item.label"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    tabitem: {
      type: Array,
      default: () => [
        {
          name: "init", //移除时使用
          label: "初始化",
        },
      ],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    activename: {
      type: String,
      default: "",
    },
  },
  data() {
    return {activeName:'init'};
  },
  watch: {
    activename(val){
      this.activeName=val
    }
  },
};
</script>

<style lang="less">
/deep/.el-tabs--border-card > .el-tabs__content {
  padding: 0 !important;
}
.el-tabs--border-card {
  height: calc(100vh - 5px);
}
</style>