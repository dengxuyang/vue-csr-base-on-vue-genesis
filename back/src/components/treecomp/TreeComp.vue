<template>
  <div>
    <el-tree
      :data="treeData"
      :default-expanded-keys="expandedkeys"
      v-loading="treeLoading"
      element-loading-spinner="el-icon-loading"
      :expand-on-click-node="!showEdit"
      node-key="row_id"
      :current-node-key="currentNodekey"
      ref="tree"
      highlight-current
      @current-change="onTreeCurrentChange"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span v-if="showEdit" class="editor_item">
          <el-tooltip
            content="添加"
            v-if="data.row_id != 0"
            effect="light"
            placement="top"
            :enterable="true"
          >
            <el-link
              icon="el-icon-plus"
              :underline="false"
              type="primary"
              @click="() => append(node, data)"
            ></el-link>
          </el-tooltip>
          <el-tooltip
            v-if="data.row_id != 0 && data.row_id != -1 && node.isLeaf"
            :enterable="false"
            content="删除"
            effect="light"
            placement="top"
          >
            <el-popconfirm
              :ref="'popcon' + data.row_id"
              title="此操作将永久删除该数据, 是否继续?"
              @confirm="() => remove(node, data)"
            >
              <el-link slot="reference" icon="el-icon-delete" :underline="false" type="primary"></el-link>
            </el-popconfirm>
          </el-tooltip>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Array,
      default: null,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      msg: "hello",
      expandedkeys: [],
      treeLoading: false,
      currentNodekey: -1,
      isAdd: false
    };
  },
  methods: {
    /**
     * 树节点改变
     */
    onTreeCurrentChange(data, node) {
      if (this.isAdd) {
        this.isAdd = false
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.currentNodekey);
          this.$nextTick(() => {
            document.querySelector(".is-current").firstChild.click();
          });
        })
      } else if (data.row_id != this.currentNodekey && this.currentNodekey == 0) {
        this.removeNewNode()
      }
      if (node.isLeaf) {
        this.$emit('treeClick', data)
      } else if (!this.showEdit) {
        this.currentNodekey = node.childNodes[0].data.row_id
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.currentNodekey);
          this.$nextTick(() => {
            document.querySelector(".is-current").firstChild.click();
          });
        });
      }
    },
    removeNewNode() {
      let RtreeNode = this.$refs['tree'].getNode(0) 
      if (RtreeNode) this.$refs['tree'].remove(RtreeNode)
    },
    append(node, data) {
      node.expanded = true
      this.removeNewNode()
      const newChild = {
        row_id: 0,
        label: '新资源',
        name: '新资源',
        remark: '',
        parent_id: data.row_id,
        children: []
      }
      if (data.row_id === -1) {
        newChild.parent_id = 0
      }

      if (!data.children) {
        this.$set(data, 'children', [])
      }
      //判断是否已有新增资源
      let isHave = false
      for (const i of data.children) {
        if (i.row_id == 0) {
          isHave = true
        }
      }
      
      if (!isHave) {
        data.children.push(newChild)
      }
      this.currentNodekey = 0
      this.isAdd = true
      //this.watchScrollTree++
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.row_id === data.row_id);
      children.splice(index, 1);
      this.currentNodekey = node.parent.data.row_id
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.currentNodekey);
        this.$nextTick(() => {
          document.querySelector(".is-current").firstChild.click();
        });
      });
    }
  },
};
</script>

<style lang='less' scope>
.el-tree {
  font-size: 12px;
}
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  width: 100%;
}
</style>