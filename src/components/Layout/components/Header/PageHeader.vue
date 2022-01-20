<template>
  <template v-if="defaultSettings.fixedHeader">
    <header class="layout-header-bar" :style="headerHeight"></header>
  </template>
  <div
    class="layout-header"
    :style="[headerStyle, headerHeight]"
    :class="headerClass"
  >
    <!-- 侧边栏布局 -->
    <template v-if="defaultSettings.layout === 'side'">
      <div class="layout-header-main">
        <div style="flex: 1 1 0%"></div>
        <div class="layout-header-component">
          <div class="header-item">
            <el-dropdown>
              <span class="header-item-account">
                <span class="header-item-avatar">
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    alt="avatar"
                  />
                </span>
                <span class="header-item-name">Ma Ma</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <template v-if="defaultSettings.menu && defaultSettings.menu.locale">
            <div class="header-item">
              <lang></lang>
            </div>
          </template>
        </div>
      </div>
    </template>
    <!-- 顶部布局 -->
    <template
      v-if="
        defaultSettings.layout === 'top' || defaultSettings.layout === 'mix'
      "
    >
      <div class="layout-header-top">
        <div class="header-top-left">
          <Logo></Logo>
        </div>
        <div class="header-top-menu" style="flex: 1 1 0%">
          <template v-if="defaultSettings.layout === 'top'">
            <aside-menu></aside-menu>
          </template>
        </div>
        <div class="header-top-right">
          <div class="layout-header-component">
            <div class="header-item">
              <el-dropdown>
                <span class="header-item-account">
                  <span class="header-item-avatar">
                    <img
                      src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                      alt="avatar"
                    />
                  </span>
                  <span class="header-item-name">Ma Ma</span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <template
              v-if="defaultSettings.menu && defaultSettings.menu.locale"
            >
              <div class="header-item">
                <lang></lang>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import Lang from '@/components/Lang/LangComponent.vue';
import { Logo } from '@/components/Layout/components/Logo';
import { AsideMenu } from '@/components/Layout/components/Menu';
import { useSettings } from '@/hooks';
const defaultSettings = useSettings();

const headerStyle = computed(() => {
  /** 固定头部，且侧边布局 */
  if (defaultSettings.fixedHeader && defaultSettings.layout === 'side') {
    return {
      width: `calc(100% - ${
        defaultSettings.defaultCollapsed
          ? `${defaultSettings.minAsideWidth}px`
          : `${defaultSettings.asideWidth}px`
      })`,
    };
  } else {
    return {
      width: '100%',
    };
  }
});
const headerHeight = computed(() => {
  return {
    height: `${defaultSettings.headerHeight}px`,
    lineHeight: `${defaultSettings.headerHeight}px`,
    zIndex: defaultSettings.layout === 'mix' ? 100 : undefined,
  };
});
const headerClass = computed(() => {
  return {
    'header-fixed': defaultSettings.fixedHeader,
    'header-dark': defaultSettings.navTheme === 'dark',
  };
});
</script>
<style lang="scss">
.layout {
  &-header {
    z-index: 19;
    flex: 0 0 auto;
    padding: 0;
    background-color: #fff;
    transition: background 0.3s, width 0.2s;

    &.header-fixed {
      position: fixed;
      top: 0;
      right: 0;
    }

    &.header-dark {
      background-color: #001529;
      transition: background 0.3s, width 0.2s;

      .el-sub-menu__title {
        border-bottom: 0 !important;
      }
    }

    &-bar {
      padding: 0 50px;
    }

    &-main {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

      > * {
        height: 100%;
      }
    }

    &-component {
      display: flex;
      gap: 8px;
      float: right;
      overflow: hidden;

      .header-item {
        &-account {
          display: flex;
          align-items: center;
          height: 48px;
          padding: 0 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        &-avatar {
          position: relative;
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 8px;
          line-height: 24px;
          vertical-align: top;
          border-radius: 50%;

          img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        &-name {
          vertical-align: middle;
        }
      }
    }

    &-top {
      display: flex;
      height: 100%;
      padding-left: 16px;
      box-shadow: 0 1px 4px 0 rgb(0 21 41 / 12%);

      .el-menu {
        border: 0;

        .el-sub-menu__title {
          height: 48px;
          line-height: 48px;
        }

        .aside-anticon {
          font-size: 16px;
        }

        .aside-title {
          margin-left: 10px;
          font-weight: 500;
          font-size: 14px;
        }
      }

      .header-top-left {
        display: flex;
        min-width: 100px;
      }
    }
  }
}
</style>
