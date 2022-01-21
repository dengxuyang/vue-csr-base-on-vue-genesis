<template>
  <div class="user_container">
    <div class="left_box el-tabs--border-card">
      <div class="title">
        <i class="el-icon-s-fold"></i> 人员管理
      </div>
      <TreeComp :tree-data="list" @treeClick="treeClick"></TreeComp>
    </div>
    <div class="right_box">
      <MainTabBar
        :activename="activeName"
        :tabitem="tabItem"
        @handleTabClick="handleTabClick"
        @closeTab="closeTab"
      >
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
          <TableComp
            :table-column="tableColumn"
            :table-data="tableData"
            :total="total"
            @editRow="editRow"
            @delRow="delRow"
          ></TableComp>
        </div>
        <div :slot="tabEditLabel">
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
                  <el-form-item label="姓名：">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号：">
                    <el-input v-model="form.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="登录密码：">
                    <el-input v-model="form.password"></el-input>
                  </el-form-item>
                  <el-form-item label="部门：">
                    <el-input v-model="form.department"></el-input>
                  </el-form-item>
                  <el-form-item label="类型：">
                    <el-select v-model="form.type" value-key placeholder clearable filterable>
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="性别：">
                    <el-input v-model="form.sex"></el-input>
                  </el-form-item>
                  <el-form-item label="出生年月：">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="民族：">
                    <el-input v-model="form.nationality"></el-input>
                  </el-form-item>
                  <el-form-item label>
                    <el-button type="primary" size="mini" @click="confirm">确认</el-button>
                    <el-button size="mini" @click="closeTab('edit')">取消</el-button>
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
import  request  from '../../_request';
import Api from '../api/Api';
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
      tableColumn: [
        {
          label: "姓名",
          prop: "name",
          fristEnten: true, //首列点击
          func: "editRow" //点击的方法
        },
        {
          label: "手机号",
          prop: "mobile"
        },
        {
          label: "部门",
          prop: "department",
        },
        {
          label: "出生年月",
          prop: "birthday",
        },
        {
          label: "操作",
          //是否是操作
          isAction: true,
          fixed: "right",
          //操作的按钮与方法
          actionItem: [
            {
              text: "编辑", //按钮的文本
              icon: "el-icon-edit",
              type: "primary", //按钮类型
              func: "editRow", //按钮的方法
            },
          ],
          //带确认的按钮
          popconfirmitem: [
            {
              text: "删除",
              icon: "el-icon-delete",
              func: "delRow",
              title: "确定删除这条数据吗？",
            },
          ],
        }
      ],
      tableData: [],
      total: 0,
      searchKey: '',
      activeName: '',
      tabItem: [
        {
          name: "init", //移除时使用
          label: "人员查看",
        },
      ],
      //0:用户；1:管理员
      typeOptions: [
        {
          label: '用户',
          value: 0
        }, {
          label: '管理员',
          value: 1
        }
      ],
      form: {},
      rules: {},
      treeSeleteData: {},
      tabEditLabel: ''
    };
  },
  mounted() {
    this.getTreeData()
  
  },
  watch: {},
  methods: {
    getTreeData() {
      let params={
        method:'get',
        url:Api.getTreeData,
        params:{directory_code:'department'}
      }
      request(params).then((result) => {
        this.list = result.data.list
        // console.log(result);
          this.getTableData()
      }).catch((err) => {
      });
    },
    getTableData() {
       let params={
        method:'get',
        url:Api.getTableData,
        params:{directory_code:'user'}
      }
      request(params).then((result) => {
        let {list, total } = result.data
        console.log(result.data);
        if (result.errcode == 0) {
          this.tableData = list
          this.total = total
        }
        // this.list = result.data.data
      }).catch((err) => {
      });
    },
    treeClick(data) {
      this.treeSeleteData = data
      this.tabItem[0].label = data.name
      this.getTableData()
    },
    handleAdd() {
      this.activeName = "edit";
      this.tabEditLabel = "新增";
      this.form={};
      if (!this.isTabOpen(this.activeName)) {
        this.tabItem.push({
          name: "edit", //移除时使用
          label: "新增",
          closable: true,
        })
      } else {
        this.tabItem[1].label = this.tabEditLabel; //打开就直接变个标题 合理！这个想法恒河里
      }
    },
    editRow(row, field) {
      this.form = JSON.parse(JSON.stringify(row));
      //点击编辑时标签页title
      this.tabEditLabel = (row[field] || row["name"]) + "-编辑";
      this.activeName = "edit";
      if (!this.isTabOpen(this.activeName)) {
        this.tabItem.push({
          name: "edit",
          label: this.tabEditLabel,
          closable: true,
        });
      } else {
        this.tabItem[1].label = this.tabEditLabel;
      }
    },
    closeTab(name) {
      this.activeName = "init";
      this.form = {}
      this.tabItem.forEach((element, index) => {
        if (element.name == name) {
          this.tabItem.splice(index, 1);
        }
      });
    },
    delRow(row) {

    },
    handleTabClick(tab) {
      let { name } = tab
      this.activeName = name;
    },
    //判断标签页是否已经打开
    isTabOpen(value) {
      return (
        this.tabItem.findIndex((val) => {
          return [value].includes(val.name);
        }) > -1
      );
    },
    confirm() {

    },

    onQuery() {

    }
  },
});
</script>
<style lang="less" scoped>
@baseColor: #05adaa;
.user_container {
  .el-select,
  .el-date-editor {
    width: 100%;
  }

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
