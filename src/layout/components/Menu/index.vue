<template>
  <aside class="layout-aside layout-aside-fixed" :style="asideStyle">
    <div class="layout-aside-children">
      <div class="logo">
        <Logo></Logo>
      </div>
      <div style="flex: 1 1 0%; overflow: hidden auto">
        <el-menu default-active="">
          <template v-for="(item, index) in currentMenu">
            <template v-if="item.meta && !item.meta.hidden">
              <el-menu-item
                v-if="
                  !item.children ||
                  item.children.length === 0 ||
                  item.children.length === 1
                "
                :key="index"
                :index="item.path"
              >
                <template #title>
                  <span class="anticon"></span>
                  <span>{{ item.meta.title }}</span>
                </template>
              </el-menu-item>
              <template v-else>
                <menu-item :key="item.path" :menu="item"></menu-item>
              </template>
            </template>
          </template>
        </el-menu>
      </div>
      <div class="layout-aside-links">
        <div class="layout-aside-links-menu">
          <span class="acticon">
            <Fold></Fold>
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ElMenu, ElMenuItem } from 'element-plus';
import MenuItem from './MenuItem.vue';
import Logo from '../Logo/index.vue';
import Fold from '@/icons/fold.svg?component';

const currentMenu: RouteRecordRaw[] = reactive([]);
const asideStyle = {
  overflow: 'hidden',
  flex: '0 0 208px',
  maxWidth: '208px',
  minWidth: '208px',
  width: '208px',
};
</script>
<style lang="scss">
.layout-aside {
  &-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  }

  &-children {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-top: -0.1px;
    padding-top: 0.1px;
  }

  &-links {
    width: 100%;
    color: #333;

    .acticon {
      font-size: 16px;
    }

    &-menu {
      height: 40px;
      margin-top: 4px;
      margin-bottom: 4px;
      padding-left: 16px;
      line-height: 40px;
    }
  }
}
</style>
