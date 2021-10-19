<template>
  <header class="layout-header" :style="headerStyle"></header>
  <div class="layout-header header-fixed">
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
              <span class="header-item-name">Serati Ma</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
const headerStyle = {
  height: '48px',
  lineHeight: '48px',
  background: 'transparent',
};
</script>
<style lang="scss">
.layout {
  &-header {
    z-index: 19;
    flex: 0 0 auto;
    width: calc(100% - 208px);
    height: 48px;
    padding: 0;
    line-height: 48px;
    background-color: #fff;

    &.header-fixed {
      position: fixed;
      top: 0;
      right: 0;
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
      gap: 8px;

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
  }
}
</style>
