<template>
  <div class="user_container">
    <div class="left_box el-tabs--border-card">
      <div class="title">
        <i class="el-icon-s-fold"></i> 部门管理
      </div>
      <TreeComp :tree-data="list" :show-edit="true" @treeClick="treeClick"></TreeComp>
    </div>
    <div class="right_box">
      <MainTabBar :activename="activeName" :tabitem="tabItem">
        <!-- v-if="tableColumn.length" -->
        <div :slot="tabItem[0].label">
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
                  <el-form-item label="部门名称：">
                    <!-- 文本框 -->
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="部门备注：">
                    <el-input type="textarea" rows="8" v-model="form.remark"></el-input>
                  </el-form-item>
                  <el-form-item label>
                    <el-button type="primary" class="el-icon-check" size="mini">保存</el-button>
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
import TreeComp from '../../components/treecomp/TreeComp';
import MainTabBar from '../../components/maintabbar/MainTabBar';
import TableComp from '../../components/tablecomp/TableComp';
import request from '../../../_request';
import Api from '../../api/Api';
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
          label: "部门编辑",
        },
      ],
      form: {},
      rules: {}
    };
  },
  mounted() {
    this.getTreeData()
  },
  watch: {},
  methods: {
    getTreeData() {
      let params = {
        method: 'get',
        url: Api.getTreeData,
        params: { directory_code: 'department' }
      }
      request(params).then((result) => {
        this.list = result.data.list
        // console.log(result);
      }).catch((err) => {
      });
    },
    treeClick(data) {
      this.tabItem[0].label = data.name + '-编辑'
      this.form = data
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
