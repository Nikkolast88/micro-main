<template>
  <div class="layout-main">
    <template
      v-if="
        defaultSettings.layout === 'side' || defaultSettings.layout === 'mix'
      "
    >
      <PageHeader></PageHeader>
      <div class="layout-content">
        <div class="page-header">
          <div class="page-header-wrap">
            <PageBreadcrumb></PageBreadcrumb>
          </div>
        </div>
        <div class="page-content">
          <div class="page-content-children">
            <div class="page-content-wrap">
              <slot>
                <router-view></router-view>
              </slot>
            </div>
          </div>
        </div>
        <template v-if="defaultSettings.footerRender">
          <PageFooter></PageFooter>
        </template>
      </div>
    </template>
    <template v-if="defaultSettings.layout === 'top'">
      <div class="layout-content">
        <div class="page-header">
          <div class="page-header-wrap">
            <PageBreadcrumb></PageBreadcrumb>
          </div>
        </div>
        <div class="page-content">
          <div class="page-content-children">
            <div class="page-content-wrap">
              <slot>
                <router-view></router-view>
              </slot>
            </div>
          </div>
        </div>
        <template v-if="defaultSettings.footerRender">
          <PageFooter></PageFooter>
        </template>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { PageHeader } from '@/components/Layout/components/Header';
import { PageBreadcrumb } from '@/components/Layout/components/Breadcrumb';
import { PageFooter } from '@/components/Layout/components/Footer';
import { useSettings } from '@/hooks';
const defaultSettings = useSettings();
</script>
<style lang="scss">
.layout-main {
  position: relative;
  flex: auto;
  min-height: 0;

  .page-content {
    width: 100%;

    &-wrap {
      margin: 24px 24px 0;
    }
  }
}
</style>
