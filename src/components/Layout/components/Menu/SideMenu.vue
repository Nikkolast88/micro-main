<template>
  <template v-if="defaultSettings.fixAside">
    <div :style="asideStyle"></div>
  </template>
  <!-- 左侧布局 -->
  <template v-if="defaultSettings.layout === 'side'">
    <aside class="layout-aside" :class="asideClass" :style="asideStyle">
      <div class="layout-aside-children">
        <div class="logo">
          <Logo></Logo>
        </div>
        <div style="flex: 1 1 0%; overflow: hidden auto">
          <el-menu
            :default-active="activeIndex"
            :collapse="defaultSettings.defaultCollapsed"
            :background-color="navBgColor"
            :text-color="textColor"
            :active-text-color="activeTextColor"
            :mode="menuMode"
            router
          >
            <template v-for="(item, index) in currentMenu">
              <template v-if="item.meta && !item.meta.hidden">
                <el-menu-item
                  v-if="!item.children || item.children.length === 0"
                  :key="index"
                  :index="item.path"
                >
                  <span class="aside-anticon icon-anticon">
                    <component :is="item.meta.icon"></component>
                  </span>
                  <template #title>
                    <span class="aside-title">{{ item.meta.title }}</span>
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
            <span class="icon-anticon" @click="onCollapse">
              <template v-if="defaultSettings.defaultCollapsed">
                <menu-fold-one
                  theme="outline"
                  size="24"
                  :strokeWidth="3"
                  strokeLinejoin="bevel"
                  strokeLinecap="square"
                />
              </template>
              <template v-else>
                <menu-unfold-one
                  theme="outline"
                  size="24"
                  :strokeWidth="3"
                  strokeLinejoin="bevel"
                  strokeLinecap="square"
                />
              </template>
            </span>
          </div>
        </div>
      </div>
    </aside>
  </template>
  <template v-if="defaultSettings.layout === 'top'">
    <el-menu
      :default-active="activeIndex"
      :collapse="false"
      :background-color="navBgColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :mode="menuMode"
      router
    >
      <template v-for="(item, index) in currentMenu">
        <template v-if="item.meta && !item.meta.hidden">
          <el-menu-item
            v-if="!item.children || item.children.length === 0"
            :key="index"
            :index="item.path"
          >
            <span class="aside-anticon icon-anticon">
              <component :is="item.meta.icon"></component>
            </span>
            <template #title>
              <span class="aside-title">{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
          <template v-else>
            <menu-item :key="item.path" :menu="item"></menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </template>
  <template v-if="defaultSettings.layout === 'mix'">
    <aside class="layout-aside" :class="asideClass" :style="asideStyle">
      <div class="layout-aside-children">
        <div style="flex: 1 1 0%; overflow: hidden auto">
          <el-menu
            :default-active="activeIndex"
            :collapse="defaultSettings.defaultCollapsed"
            :background-color="navBgColor"
            :text-color="textColor"
            :active-text-color="activeTextColor"
            :mode="menuMode"
            router
          >
            <template v-for="(item, index) in currentMenu">
              <template v-if="item.meta && !item.meta.hidden">
                <el-menu-item
                  v-if="!item.children || item.children.length === 0"
                  :key="index"
                  :index="item.path"
                >
                  <span class="aside-anticon icon-anticon">
                    <component :is="item.meta.icon"></component>
                  </span>
                  <template #title>
                    <span class="aside-title">{{ item.meta.title }}</span>
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
            <span class="icon-anticon" @click="onCollapse">
              <template v-if="defaultSettings.defaultCollapsed">
                <menu-fold-one
                  theme="outline"
                  size="24"
                  :strokeWidth="3"
                  strokeLinejoin="bevel"
                  strokeLinecap="square"
                />
              </template>
              <template v-else>
                <menu-unfold-one
                  theme="outline"
                  size="24"
                  :strokeWidth="3"
                  strokeLinejoin="bevel"
                  strokeLinecap="square"
                />
              </template>
            </span>
          </div>
        </div>
      </div>
    </aside>
  </template>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue';
import { RouteRecordRaw, useRoute } from 'vue-router';
import { ElMenu, ElMenuItem } from 'element-plus';
import MenuItem from './MenuItem.vue';
import { Logo } from '@/components/Layout/components/Logo';

import { MenuFoldOne, MenuUnfoldOne } from '@icon-park/vue-next';

import { asyncRoutes } from '@/router';
import { useSettings } from '@/hooks';
const defaultSettings = useSettings();

const currentMenu: RouteRecordRaw[] = reactive(asyncRoutes);
const activeIndex = computed(() => {
  return useRoute().path;
});

const asideStyle = computed(() => {
  const px = defaultSettings.defaultCollapsed
    ? `${defaultSettings.minAsideWidth}px`
    : `${defaultSettings.asideWidth}px`;
  return {
    overflow: 'hidden',
    flex: `0 0 ${px}`,
    maxWidth: `${px}`,
    minWidth: `${px}`,
    width: `${px}`,
    paddingTop: `${
      defaultSettings.layout === 'mix' ? defaultSettings.headerHeight : ''
    }px`,
    transition:
      'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s',
  };
});
const asideClass = computed(() => {
  return {
    'aside-collapse': defaultSettings.defaultCollapsed,
    'aside-fixed': defaultSettings.fixAside,
    'aside-dark': defaultSettings.navTheme === 'dark',
  };
});
/**
 * 菜单展示模式
 * horizontal / vertical
 */
const menuMode = computed(() => {
  return defaultSettings.layout === 'top' ? 'horizontal' : 'vertical';
});

/**折叠 */
const onCollapse = () => {
  defaultSettings.defaultCollapsed = !defaultSettings.defaultCollapsed;
};
const textColor = computed(() => {
  return defaultSettings.navTheme === 'dark'
    ? 'rgba(255,255,255,0.65)'
    : '#333';
});
const activeTextColor = computed(() => {
  return defaultSettings.navTheme === 'dark'
    ? '#fff'
    : defaultSettings.primaryColor;
});
const navBgColor = computed(() => {
  return defaultSettings.navTheme === 'dark'
    ? defaultSettings.navBgColor
    : '#fff';
});
</script>
<style lang="scss">
.layout-aside {
  position: relative;
  background-color: #fff;

  .el-menu {
    border-right-color: transparent;

    /** 菜单折叠后，组件样式修改 */
    &--collapse {
      width: 48px;

      .el-sub-menu__title {
        padding: 0 !important;

        .aside-anticon {
          width: 100%;
          height: 100%;
          margin-right: 0;
          font-size: 18px;
          text-align: center;
          visibility: visible;
          transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
            margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s;
        }

        .aside-title {
          margin: 0;
        }
      }

      .el-menu-item {
        padding: 0 !important;

        > div {
          padding: 0 !important;
        }

        .aside-anticon {
          width: 100%;
          margin-right: 0;
          font-size: 18px;
          text-align: center;
          transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
            margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s;
        }
      }

      .is-active {
        .aside-anticon {
          color: var(--el-menu-active-color);
        }
      }
    }
  }

  &.aside-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  &.aside-dark {
    background-color: #001529;

    .layout-aside-links {
      color: rgb(255 255 255 / 65%);
    }

    .layout-aside-links-menu {
      border-top-color: transparent;
    }
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

    &-menu {
      height: 40px;
      margin-top: 4px;
      margin-bottom: 4px;
      padding-left: 16px;
      line-height: 40px;
      border-top: 1px solid #f0f0f0;
      cursor: pointer;
    }
  }

  .aside-anticon {
    font-size: 16px;
  }

  .aside-title {
    margin-left: 10px;
    font-weight: 500;
    font-size: 14px;
  }

  &.aside-collapse {
    .layout-aside-links-menu {
      position: relative;
      padding: 0 calc(50% - 12px);
      text-overflow: clip;
      transition: border-color 0.3s, background 0.3s,
        padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>
