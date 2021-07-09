
<template>
  <div class="basic-layout">
    <el-container style="height: 100vh">
      <div class="sider-open"></div>
      <el-aside class="sider-fixed" width="240px" style="background-color: #0c6dee">
        <logo></logo>
        <div style="flex: 1 1 0%; overflow: hidden auto;">
          <el-menu router :default-active="selectedKeys" background-color="#0c6dee" text-color="#fff" active-text-color="#00ffbc">
            <template v-for="(item, index) in currentMenu">
              <template v-if="item.meta && !item.meta.hidden">
                <el-menu-item v-if="!item.children || item.children.length === 0 || item.children.length === 1" :key="index" :index="item.path">
                  <template #title>
                    <span class="menu-svg">
                      <component :is="item.meta.icon"></component>
                    </span>
                    <span class="menu-title">{{ item.meta.title }}</span>
                  </template>
                </el-menu-item>
                <sub-menu v-else :key="item.path" :menu="item"></sub-menu>
              </template>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <header class="ant-layout-header" style="height: 64px; line-height: 64px; background: transparent;"></header>
        <el-header class="global-header fixed-header" style="width: calc(100% - 240px);">
          <header-container :is-show="isShow"></header-container>
        </el-header>
        <el-main style="background:#F2F6FC;" class="main-body">
          <page-title></page-title>
          <div class="main-container">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import SubMenu from './components/SubMenu.vue';
import HeaderContainer from '@/components/GlobalHeader/index.vue';
import Logo from '@/layout/components/Logo.vue';
import PageTitle from './components/PageTitle.vue';
// import { asyncRouter } from '@/router/index';
import { useRoute } from 'vue-router';
import { ProjectSvg } from '@/icons';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'BasicLayout',
  components: {
    SubMenu,
    HeaderContainer,
    Logo,
    ProjectSvg,
    PageTitle,
  },
  setup() {
    const $store = useStore();
    const $route = useRoute();
    let flag = false;
    $store.getters.permission_menu.map((e: any) => {if (e.path === '/workbench') flag = true;});
    const menus = computed(() => $store.getters.permission_menu);
    const isShow = ref(flag);
    // 当前动态路由
    const state = reactive({
      currentMenu: menus,
      selectedKeys: $route.path,
    });

    return {
      ...toRefs(state),
      menus,
      isShow,
    };
  },
});
</script>

<style lang="scss">
.basic-layout{
  height: 100%;
  .name{
    font-size: 16px;
  }
  .logo-container{
    padding: 0 11px;
  }
  .global-header{
    position: relative;
    display: flex;
    align-items: center;
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    &.fixed-header{
      position: fixed;
      top: 0;
      right: 0;
      z-index: 2;
    }
  }
  .sider-open{
    width: 240px;
    overflow: hidden;
    flex: 0 0 240px;
    max-width: 240px;
    min-width: 240px;
  }
  .sider-fixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  }
  .main-body{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .main-container{
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>