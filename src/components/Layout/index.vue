<template>
  <div class="layout-container">
    <!-- 侧边布局 -->
    <template v-if="defaultSettings.layout === 'side'">
      <section class="layout-has-sider">
        <AsideMenu></AsideMenu>
        <MainView> </MainView>
      </section>
    </template>
    <!-- 顶部布局 -->
    <template v-if="defaultSettings.layout === 'top'">
      <section class="layout-has-header">
        <PageHeader></PageHeader>
        <MainView> </MainView>
      </section>
    </template>
    <!-- 混合布局 -->
    <template v-if="defaultSettings.layout === 'mix'">
      <section class="layout-has-sider">
        <!-- <PageHeader></PageHeader> -->
        <AsideMenu></AsideMenu>
        <MainView> </MainView>
      </section>
    </template>
  </div>
  <SettingDrawerVue></SettingDrawerVue>
</template>
<script setup lang="ts">
import { AsideMenu } from '@/components/Layout/components/Menu';
import { MainView } from '@/components/Layout/components/Main';
import { PageHeader } from '@/components/Layout/components/Header';
import SettingDrawerVue from '../SettingDrawer/SettingDrawer.vue';
import { useSettings } from '@/hooks';
const defaultSettings = useSettings();
</script>
<style lang="scss">
.layout {
  &-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    background: #f0f2f5;
  }

  &-has-sider {
    display: flex;
    flex: auto;
    flex-direction: row;
    min-height: 100%;
  }

  &-has-header {
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 100%;
  }
}
</style>
