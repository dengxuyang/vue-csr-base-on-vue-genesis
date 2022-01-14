<template>
  <div class="user_container">
    <div class="left_box el-tabs--border-card">
      <div class="title"><i class="el-icon-s-fold"></i> 部门管理</div>
      <TreeComp :tree-data="list" :show-edit='true'></TreeComp>
    </div>
    <div class="right_box">
      <MainTabBar
        :activename="activeName"
        :tabitem="tabItem"
      >
        <!-- v-if="tableColumn.length" -->
        <div :slot="'初始化'">
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
                    <el-input
                      v-model="form.test"
                    ></el-input>
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
import axios from "axios";
import TreeComp from '../components/treecomp/TreeComp';
import MainTabBar from '../components/maintabbar/MainTabBar';
import TableComp from '../components/tablecomp/TableComp';
import {request} from '../request';
export default Vue.extend({
  name: "user",
  components:{
    TreeComp,
    MainTabBar,
    TableComp
  },
  data() {
    return {
      list:[],
      tableColumn:[],
      searchKey:'',
      activeName:'',
      tabItem:[
        {
          name: "init", //移除时使用
          label: "初始化",
        },
      ],
      form:{},
      rules:{}
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
        this.list=result.data.data
         console.log(result);
     }).catch((err) => {
     });;
    },
    onQuery(){

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
    .fromContainer{
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
