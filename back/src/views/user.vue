<template>
  <div class="user_container">
    <div class="left_box el-tabs--border-card">
      <div class="title">
        <i class="el-icon-s-fold"></i> 人员管理
      </div>
      <TreeComp :tree-data="list" @treeClick="treeClick"></TreeComp>
    </div>
    <div class="right_box">
      <MainTabBar :activename="activeName" :tabitem="tabItem" @closeTab="closeTab">
        <!-- v-if="tableColumn.length" -->
        <div :slot="tabItem[0].label">
          <el-row type="flex" class="row-bg top-box" justify="space-between">
            <el-col :span="6">
              <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
            </el-col>
            <el-form @submit.native.prevent :inline="true">
              <el-form-item label="名称：">
                <el-input size="mini" @keyup.enter.native="onQuery" clearable v-model="searchKey"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="primary" @click="onQuery" icon="el-icon-search">查询</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <TableComp></TableComp>
        </div>
        <div :slot="'新增/编辑'">
          <div class="fromContainer">
            <el-form
              :model="form"
              status-icon
              :rules="rules"
              ref="form"
              label-width="100px"
              size="mini"
              labelWidth="auto"
              style="width: 100%"
            >
              <!-- left -->
              <el-row :gutter="20">
                <el-col :sm="24" :md="18" :lg="18" :xl="12" :offset="0">
                  <el-form-item :label="`测试：`">
                    <!-- 文本框 -->
                    <el-input v-model="form.test"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </MainTabBar>
    </div>
  </div>
</template>
<script lang="js">
import Vue from "vue";
import TreeComp from '../components/treecomp/TreeComp';
import MainTabBar from '../components/maintabbar/MainTabBar';
import TableComp from '../components/tablecomp/TableComp';
import {request} from '../request';
export default Vue.extend({
  name: "user",
  components: {
    TreeComp,
    MainTabBar,
    TableComp
  },
  data() {
    return {
      list: [],
      tableColumn: [],
      searchKey: '',
      activeName: '',
      tabItem: [
        {
          name: "init", //移除时使用
          label: "人员查看",
        },
      ],
      form: {},
      rules: {},
      treeSeleteData: {}
    };
  },
  mounted() {
    this.getData()
  },
  watch: {},
  methods: {
    getData() {
      let url =
        "https://mock.mengxuegu.com/mock/61e0ed8b17249f68847fc031/api/getTreeData";
        request.get(url).then((result) => {
        this.list = result.data.data
        console.log(result);
      }).catch((err) => {
      });
    },
    handleAdd() {
      this.activeName = "edit";
      this.tabItem.push({
        name: "edit", //移除时使用
        label: "新增/编辑",
        closable: true,
      })
    },
    closeTab(name) {
      this.activeName = "init";
      this.tabItem.forEach((element, index) => {
        if (element.name == name) {
          this.tabItem.splice(index, 1);
        }
      });
    },
    treeClick(data) {
      this.treeSeleteData = data
      this.tabItem[0].label = data.name
    },
    onQuery() {

    }
  },
});
</script>
<style lang="less" scoped>
@baseColor: #05adaa;
.user_container {
  display: flex;

  .left_box {
    width: 200px;
    height: calc(100vh - 5px);
    .title {
      text-align: left;
      font-size: 14px;
      color: @baseColor;
      padding-left: 5px;
      height: 40px;
      line-height: 40px;
    }
  }
  .right_box {
    flex: 1;
    overflow: hidden;
    .fromContainer {
      padding-left: 20px;
    }
  }
}
.tab_style {
  height: 99.9vh;
}
.listyle {
  background-color: antiquewhite;
}
</style>
