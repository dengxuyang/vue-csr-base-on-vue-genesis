<template>
  <!-- 数据资源 左侧导航栏 -->
  <div class="leftnav">
    <div class="colspan" @click="isCollapse = !isCollapse">
      <i v-show="!isCollapse" class="el-icon-caret-left iconcollapse"></i>
      <i v-show="isCollapse" class="el-icon-caret-right iconcollapse"></i>
    </div>
    <div class="menu_box">
      <el-menu
        :default-active="defaultActive"
        mode="vertical"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        unique-opened
        ref="refmenu"
      >
        <fragment v-for="item in leftNavData" :key="item.index">
          <el-menu-item
            v-if="!item.childe"
            :index="item.index"
            @click="menuClick(item)"
            class="one_menu_item"
          >
            <i :class="item.icon"></i>
            <span slot="title" style>{{ item.name }}</span>
          </el-menu-item>
          <!-- 多级菜单 -->
          <el-submenu
            :ref="'submenu' + item.index"
            v-else
            :key="item.index"
            :index="item.index"
          >
            <template slot="title">
              <i style="color: #ffffff" :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="itemc in item.childe"
              :key="itemc.index"
              :index="itemc.index"
              @click="menuClick(itemc)"
              class="submenu_item"
            >
              <span slot="title">{{ itemc.name }}</span>
            </el-menu-item>
          </el-submenu>
        </fragment>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { leftNavData } from "./conf/leftNavData.js";
// import TreeComp from '@components/content/treecomp/TreeComp'
export default {
  components: {
    // TreeComp
  },
  data() {
    return {
      isCollapse: false,
      openeds: [1],
      leftNavData: leftNavData,
      defaultActive: "play",
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      //展开菜单时 默认选择第一项子菜单
      let submenuDom = this.$refs["submenu" + key][0];
      //当菜单不处于活跃状态时选中
      if (!submenuDom.active) {
        //解决js线程阻塞ui线程 菜单卡顿问题
        setTimeout(() => {
          submenuDom.$children[0].$el.click();
        }, 350);
      }
    },
    handleClose(key, keyPath) {},

    //点击菜单
    menuClick(item) {
     let {index,name,isRouter}=item
     // this.$store.commit("setcurrentNav", { index, name });
     this.$emit('menuClick',item)
      if (isRouter) {
        this.$router.push({ name: index });

        //收起展开的submenu
        //活跃的时候不关，做判断
        //收起展开的submenu
        let openedMenus = this.$refs["refmenu"].openedMenus;
        openedMenus.forEach((i) => {
          let openArr = this.leftNavData.filter((item) => {
            return item.index == i;
          })[0]["childe"];
          if (!openArr.includes(item)) {
            this.$refs["refmenu"].close(i);
          }
        });
        // if (this.$router.currentRoute.path === "/systemconfig" || this.$router.currentRoute.path === "/amt_columnconf") {
        // } else {
        //   let openedMenus = this.$refs["refmenu"].openedMenus;
        //   openedMenus.forEach((i) => {
        //     this.$refs["refmenu"].close(i);
        //   });
        // }
      }
      //  else if (this.$route != "modelmanage") {
      //   this.$router.push({ name: "modelmanage" });
      // }
    },
  },
  watch:{
    // ActiveM(val){
    //   this.defaultActive=val.index
    // }
  },
  computed:{
    // ActiveM(){
    //   return this.$store.state.currentNav
    // }
  }
};
</script>

<style scoped lang="scss">
.leftnav {
  position: relative;
  /* width: 215px; */
  height: 100vh;
  background: url("~@assets/images/sidebar_bg.png");
  background-size: cover;
  float: left;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 215px;
}
.el-menu-item i {
  color: #ffffff;
}
.menu_box {
  height: 100%;
  overflow-y: auto;
}
.menu_box::-webkit-scrollbar {
  width: 0 !important;
}
.menu_box {
  -ms-overflow-style: none;
}
.el-menu {
  background-color: unset;
}
.el-menu-item.submenu_item.is-active {
  color: #04918e;
  background-color: #ffffff;
  span {
    border-bottom: 2px solid #04918e;
  }
}
.submenu_item span {
  margin-left: 8px;
  padding-bottom: 5px;
}
.el-submenu__title:hover {
  color: #e70f0f;
}

.one_menu_item.is-active {
  background-color: #04918e !important;
  color: #ffffff;
  border-bottom: 0px solid;
}
.one_menu_item.el-menu-item:hover {
  // color: #ffffff;
  background-color: #09c5c2 !important;
}
.one_menu_item.el-menu-item {
  color: #ffffff;
  padding-left: 0px;
}
.el-submenu.is-active {
  background-color: #04918e !important;
}
</style>

