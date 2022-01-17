<template>
  <!-- 表格组件 -->
  <div class="tablecontaner">
    <el-table
      ref="table"
      height="calc(100vh - 160px)"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
      tooltip-effect="dark"
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      class="tablepad"
      :row-style="{ height: '36px' }"
      :cell-style="{ padding: '0px' }"
      :header-row-style="{ height: '20px' }"
      v-if="tableColumn.length != 0"
    >
      <el-table-column align="center" v-if="showBatchDel" type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="item in tableColumn.filter((item) => !item.isAction)"
        :key="item.row_id"
        :align="item.isAction ? 'left' : 'center'"
        :prop="item.prop"
        :label="item.label"
        min-width="150"
        show-overflow-tooltip
        :fixed="item.fixed"
        :width="item.isAction ? '100' : ''"
      >
        <template slot-scope="scope">
          <!-- 序号显示 -->
          <span v-if="item.index"
            ><el-link
              v-if="item.fristEnten"
              @click="$emit(item.func, scope.row, getEnterFiled())"
            >
              {{ scope["$index"] + 1 }}</el-link
            >
            <span v-else>
              {{ scope["$index"] + 1 }}
            </span></span
          >
          <!-- 操作列显示 -->

          <!-- 星级 针对特殊显示的处理 一般不用 （云野大数据平台使用） -->
          <span v-else-if="item.level">
            <el-rate
              :value="scope.row[item.prop]"
              disabled
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </span>
          <!-- 默认显示 -->
          <span
            :style="
              !item.condition
                ? item.style
                : istrue(item.condition, scope.row)
                ? item.style
                : ''
            "
            v-else
          >
            <!-- 设置第一行选择 进入编辑 fristEnten：true func为执行的方法-->
            <el-link
              v-if="item.fristEnten"
              @click="$emit(item.func, scope.row, getEnterFiled())"
            >
              {{ scope.row[item.prop] }}</el-link
            >
            <!-- 设置状态 如1表示已启用 2表示未启用 传来一个map filterData 就会根据当前值去map中查询 -->
            <span v-else-if="item.map">{{
              scope.row[item.prop] | filterData(item.map)
            }}</span>
            <!-- 默认显示 -->
            <span v-else>
              {{ scope.row[item.prop] }}
            </span>
          </span>
        </template>
      </el-table-column>
       <el-table-column
        v-for="item in tableColumn.filter((item) => item.isAction)"
        :key="item.row_id"
        align="left"
        :prop="item.prop"
        :label="item.label"
        width="100"
        show-overflow-tooltip
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <!-- 操作列显示 -->
          <span>
            <el-button
              class="btn-icon"
              v-for="actionItem in item.actionItem"
              :key="actionItem.text"
              @click="
                $emit(
                  id == null ? actionItem.func : 'editStyle',
                  scope.row,
                  getEnterFiled()
                )
              "
              type="text"
              size="small"
              v-show="istrue(actionItem.condition, scope.row)"
            >
                            <el-tooltip
                effect="dark"
                :enterable="false"
                :content="actionItem.text"
                placement="top"
              >
                <i :class="actionItem.icon"></i>
                              </el-tooltip
              >
                          </el-button
            >
                        <el-popconfirm
              v-for="actionItem in item.popconfirmitem"
              :key="actionItem.text"
              :title="actionItem.title"
              @confirm="$emit(actionItem.func, scope.row)"
            >
               <el-button
                class="btn-icon"
                slot="reference"
                type="text"
                size="small"
                v-show="istrue(actionItem.condition, scope.row)"
                style="margin-left: 10px"
              >
                 <el-tooltip
                  effect="dark"
                  :enterable="false"
                  :content="actionItem.text"
                  placement="top"
                >
                  <i :class="actionItem.icon"></i>
                   </el-tooltip
                >
                              </el-button
              >
                          </el-popconfirm
            >
                      </span
          >
                  </template
        >
         </el-table-column
      >
    </el-table>
    <!-- 表格分页 -->
    <div class="footer" v-if="tableColumn.length != 0">
      <div>
        <el-button
          :disabled="!selectRows.length"
          type="primary"
          v-if="showBatchDel"
          size="mini"
          @click="$emit('batchDel', selectRows)"
          >批量删除</el-button
        >
      </div>
      <div>
        <el-pagination
          background
          :page-size="pageNum"
          layout="prev, pager, next, total"
          :total="pagetotal"
          :current-page.sync="pageNo"
          @current-change="
            (val) => {
              $emit('handlePageChange', val);
            }
          "
        >
        </el-pagination>
      </div>
      <div>
        <el-button type="primary" v-if="showExport" size="mini">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** tableColumn 为表的列 配置项如下：
     * label 显示的中文名称
     * prop  对应数据的字段
     * index 是否为序号列
     * fristEnten 首列点击
     * func  对应的方法
     * isAction 是否为操作列 默认false
     * fixed 是否固定列 left right
     * condition 是一个表达式 通过eval 执行 可以使用 表格中的 scope获取单元格的值  如 scope.row.bar=='foo'
       如单元格需要在某个条件下 标记为红色 和传来的style一起使用 或者v-show 显示隐藏单元格
     * style 列样式 obj类型 {color:'red'}
     * map  设置状态 new Map([[1,'已启用'],[2,未启用]]) 
      如1表示已启用 2表示未启用 传来一个map 如当前值为1 filterData 去map中查询 返回已启用
     * actionItem array类型 如下配置 
     * [{
              text: "编辑", //按钮的文本
              icon: "el-icon-edit",
              type: "primary", //按钮类型
              func: "editRow", //按钮的方法
              condition:'一个不让编辑的表达式 可以使用 表格中的 scope获取单元格的值'
            },]
     * 
      * popconfirmitem array类型  为带确认的按钮 如
      [
            {
              text: "删除",
              icon: "el-icon-delete",
              func: "delRow",
              title: "确定删除这条数据吗？",
            },
          ],
     */
    tableColumn: {
      type: Array,
      default: () => [
        {
          label: "测试",
          prop: "test",
          fristEnten: true, //首列点击
          func: "editRow", //点击的方法
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
            {
              text: "风格编辑", //按钮的文本
              icon: "el-icon-s-operation",
              type: "primary", //按钮类型
              func: "editRowStyle", //按钮的方法
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
        },
      ],
    },
    /*****
     * 表格数据
     */
    tableData: {
      type: Array,
      default: () => [],
    },
    /*****
     * 表格页面条数
     */
    pagenum: { type: Number, default: 0 },
    /*****
     * 表格页面条数
     */
    pageno: { type: Number, default: 1 },
    /*****
     * 总条数
     */
    total: { type: Number, default: 0 },
    /*****
     * 是否显示批量删除
     */
    showBatchDel: { type: Boolean, default: false },
    /*****
     * 是否显示导出按钮
     */
    showExport: { type: Boolean, default: false },
    /*****
     * 加载中状态
     */
    loading: { type: Boolean, default: false },
  },
  watch: {
    total(val) {
      this.pagetotal = val;
    },
    pagenum(val) {
      this.pageNum = val;
    },
    pageno(val) {
      this.pageNo = val;
    },
  },
  data() {
    return {
      pagetotal: 0,
      pageNum: 10,
      pageNo: 0,
      selectRows: [],
      id: null,
      currentNav: null,
    };
  },
  created() {
    this.id = this.$store.state.current_module_id;
    // this.currentNav = this.$store.state.currentNav.index;
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "rowlight";
      } else {
        return "rowdeep";
      }
    },
    handleSelectionChange(rows) {
      this.selectRows = rows;
    },
    getEnterFiled() {
      let Filed = this.tableColumn[0].prop;
      return Filed;
    },
    //传来一个布尔条件字符串 执行返回
    istrue(condition, scope) {
      if (condition) {
        return eval(condition);
      }
      return true;
    },
    isShow(value = true) {
      return value;
    },
  },
  beforeUpdate() {
    this.$nextTick(() => {
      //在数据加载完，重新渲染表格
      if (this.$refs["table"]) {
        this.$refs["table"].doLayout();
      }
    });
  },
  filters: {
    //根据值返回相应数据
    filterData: function (value, map) {
      return map.get(Number(value)) ? map.get(Number(value)) : "";
    },
  },
};
</script>
<style lang='less' scoped>

.tablecontaner {
  height: calc(100vh - 100px);
}

.footer {
  display: flex;
  margin-top: 10px;
}
.footer > div {
  flex: 1;
}
.footer > div:nth-child(1) {
  text-align: left;
}
.footer > div:nth-child(2) {
  text-align: center;
}
.footer > div:nth-child(3) {
  text-align: right;
}
.el-tooltip__popper {
  max-width: 30%;
  padding-bottom: 5px !important;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 15;
  /* -webkit-box-orient: vertical; */
}
.el-tooltip__popper,
.el-tooltip__popper.is-dark {
  /* background: rgb(48, 65, 86) !important; */
  color: #fff !important;
  /* line-height: 24px; */
}
/deep/.el-table th {
    background-color: rgb(238, 241, 246) !important;
    color: rgb(144, 147, 153);
     padding: 0 !important;
    height: 35px;
}

/deep/.el-table thead {
    color: #343a4a;
}

</style>