<template>
  <teleport to="body">
    <div>
      <div class="setting-drawer">
        <div class="setting-drawer-wrapper" :style="drawerStyle">
          <div class="setting-drawer-content">
            <el-drawer
              v-model="state.drawerVisible"
              size="300px"
              :showClose="false"
            >
              <template #title>
                <div class="">项目配置</div>
              </template>
              <div class="drawer-body">
                <div style="margin-bottom: 48px">
                  <el-divider>整体风格设置</el-divider>
                  <div class="setting-drawer-item">
                    <div
                      class="theme-layout theme-light"
                      @click="onNavStyle('light')"
                    >
                      <el-tooltip placement="top" content="亮色菜单风格">
                        <div>
                          <div class="check-layout"></div>
                          <span
                            class="check-dot"
                            v-show="defaultSettings.navTheme === 'light'"
                          ></span>
                        </div>
                      </el-tooltip>
                    </div>
                    <div
                      class="theme-layout theme-dark"
                      @click="onNavStyle('dark')"
                    >
                      <el-tooltip placement="top" content="暗色菜单风格">
                        <div>
                          <div class="check-layout"></div>
                          <span
                            class="check-dot"
                            v-show="defaultSettings.navTheme === 'dark'"
                          ></span>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
                <div style="margin-bottom: 48px">
                  <el-divider>主题色</el-divider>
                  <div class="setting-drawer-item">
                    <template
                      v-for="(item, index) in defaultSettings.themeList"
                      :key="index"
                    >
                      <el-tooltip :content="item.name" placement="top">
                        <div
                          class="theme-color"
                          :style="{ backgroundColor: item.color }"
                          @click="onThemeColor(item.color)"
                        >
                          <template
                            v-if="item.color === defaultSettings.primaryColor"
                          >
                            <Check size="18" :strokeWidth="4" />
                          </template>
                        </div>
                      </el-tooltip>
                    </template>
                  </div>
                </div>
                <div style="margin-bottom: 48px">
                  <el-divider>导航栏模式</el-divider>
                  <div class="setting-drawer-item">
                    <div
                      class="theme-mode mode-side"
                      @click="onThemeLayout('side')"
                    >
                      <el-tooltip placement="top" content="侧边菜单布局">
                        <div>
                          <div class="check-layout"></div>
                          <span
                            class="check-dot"
                            v-show="defaultSettings.layout === 'side'"
                          ></span>
                        </div>
                      </el-tooltip>
                    </div>
                    <div
                      class="theme-mode mode-top"
                      @click="onThemeLayout('top')"
                    >
                      <el-tooltip placement="top" content="顶部菜单布局">
                        <div>
                          <div class="check-layout"></div>
                          <span
                            class="check-dot"
                            v-show="defaultSettings.layout === 'top'"
                          ></span>
                        </div>
                      </el-tooltip>
                    </div>
                    <div
                      class="theme-mode mode-mix"
                      @click="onThemeLayout('mix')"
                    >
                      <el-tooltip placement="top" content="混合菜单布局">
                        <div>
                          <div class="check-layout"></div>
                          <span
                            class="check-dot"
                            v-show="defaultSettings.layout === 'mix'"
                          ></span>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
                <div style="margin-bottom: 48px">
                  <el-divider>界面功能</el-divider>
                  <div class="setting-drawer-item">
                    <div class="item-label">固定Header</div>
                    <div class="item-value">
                      <el-switch
                        v-model="defaultSettings.fixedHeader"
                        :active-value="true"
                        :inactive-value="false"
                      ></el-switch>
                    </div>
                  </div>
                  <div class="setting-drawer-item">
                    <div class="item-label">固定侧边栏</div>
                    <div class="item-value">
                      <el-switch
                        v-model="defaultSettings.fixAside"
                        :active-value="true"
                        :inactive-value="false"
                        :disabled="defaultSettings.layout !== 'side'"
                      ></el-switch>
                    </div>
                  </div>
                  <template v-if="defaultSettings.menu">
                    <div class="setting-drawer-item">
                      <div class="item-label">固定国际化</div>
                      <div class="item-value">
                        <el-switch
                          v-model="defaultSettings.menu.locale"
                          :active-value="true"
                          :inactive-value="false"
                        ></el-switch>
                      </div>
                    </div>
                  </template>
                </div>
                <div style="margin-bottom: 48px">
                  <el-divider>内容区域</el-divider>
                  <div class="setting-drawer-item">
                    <div class="item-label">页脚</div>
                    <div class="item-value">
                      <el-switch
                        v-model="defaultSettings.footerRender"
                        :active-value="true"
                        :inactive-value="false"
                      ></el-switch>
                    </div>
                  </div>
                </div>
                <div style="margin-bottom: 48px">
                  <el-divider></el-divider>
                  <div class="setting-drawer-item">
                    <el-alert type="warning" :closable="false">
                      <div class="item-alert">
                        配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件defaultSettings.ts
                      </div>
                    </el-alert>
                  </div>
                </div>
              </div>
            </el-drawer>
          </div>
          <div class="setting-drawer-handle" @click="onSettingHandle">
            <template v-if="state.drawerVisible">
              <Close
                theme="outline"
                size="24"
                fill="#fff"
                :strokeWidth="3"
                strokeLinejoin="bevel"
                strokeLinecap="square"
              />
            </template>
            <template v-else>
              <Setting
                theme="outline"
                size="24"
                fill="#fff"
                :strokeWidth="3"
                strokeLinejoin="bevel"
                strokeLinecap="square"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import {
  ElDrawer,
  ElDivider,
  ElTooltip,
  ElSwitch,
  ElAlert,
} from 'element-plus';
import { Setting, Close, Check } from '@icon-park/vue-next';
import { useSettings, useSetCssVar } from '@/hooks';
const defaultSettings = useSettings();

const drawerStyle = computed(() => {
  return {
    width: '300px',
    transform: state.drawerVisible ? '' : 'translateX(100%)',
  };
});
const state = reactive({
  drawerVisible: false,
});
const onSettingHandle = () => {
  state.drawerVisible = !state.drawerVisible;
};
const onNavStyle = (theme: 'light' | 'dark') => {
  defaultSettings.navTheme = theme;
};
const onThemeColor = (color: string) => {
  defaultSettings.primaryColor = color;
  useSetCssVar('--el-color-primary', color);
};

const onThemeLayout = (layout: 'side' | 'top' | 'mix') => {
  defaultSettings.layout = layout;
};
</script>
<style lang="scss">
.setting-drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  width: 0;
  height: 100%;
  transition: width 0s ease 0.3s, height 0s ease 0.3s;

  .el-drawer__body {
    padding: 0;
    overflow: auto;
  }

  .drawer-body {
    padding: 16px;
  }

  &-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &-item {
    display: flex;
    padding: 12px 0;
    font-size: 14px;

    .item-label {
      flex: 1;
    }

    .item-alert {
      line-height: 1.5715;
    }
  }

  &-content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;

    .theme-layout {
      position: relative;
      width: 44px;
      margin-right: 16px;

      .check-layout {
        position: relative;
        width: 44px;
        height: 36px;
        margin-right: 16px;
        overflow: hidden;
        background-color: #f0f2f5;
        border-radius: 4px;
        box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
        cursor: pointer;

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: #fff;
          content: '';
        }

        &::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
          content: '';
        }
      }

      .check-dot {
        position: absolute;
        bottom: -13px;
        left: 22px;
        width: 8px;
        height: 8px;
        background-color: var(--el-color-success);
        border-radius: 50%;
      }

      &.theme-dark {
        .check-layout {
          &::before {
            z-index: 1;
            background-color: #001529;
          }
        }
      }
    }

    .theme-mode {
      position: relative;
      width: 44px;
      margin-right: 16px;

      .check-layout {
        position: relative;
        width: 44px;
        height: 36px;
        margin-right: 16px;
        overflow: hidden;
        background-color: #f0f2f5;
        border-radius: 4px;
        box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
        cursor: pointer;

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: #fff;
          content: '';
        }

        &::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
          content: '';
        }
      }

      &.mode-side {
        .check-layout {
          &::before {
            z-index: 1;
            background-color: #001529;
          }
        }
      }

      &.mode-top {
        .check-layout {
          &::after {
            background-color: #001529;
          }

          &::before {
            background-color: transparent;
            content: '';
          }
        }
      }

      &.mode-mix {
        .check-layout {
          &::before {
            background-color: #fff;
          }

          &::after {
            background-color: #001529;
          }
        }
      }

      .check-dot {
        position: absolute;
        bottom: -13px;
        left: 22px;
        width: 8px;
        height: 8px;
        background-color: var(--el-color-success);
        border-radius: 50%;
      }
    }

    .theme-color {
      float: left;
      width: 20px;
      height: 20px;
      margin-top: 8px;
      margin-right: 8px;
      color: #fff;
      font-weight: 700;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
    }
  }

  &-handle {
    position: absolute;
    top: 240px;
    right: 300px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 16px;
    text-align: center;
    background-color: var(--el-color-primary);
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;
  }
}
</style>
