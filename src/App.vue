<template>
  <el-config-provider :locale="locale" :button="{ autoInsertSpace: true }">
    <template v-if="routeName">
      <router-view></router-view>
    </template>
    <template v-else>
      <Layout>
        <div id="app"></div>
      </Layout>
    </template>
  </el-config-provider>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { Layout } from '@/router/constantRouter';
import { useRoute } from 'vue-router';

const locale = zhCn;
const $route = useRoute();
const routeName = computed(() => $route.name);
</script>
<style lang="scss">
@import './styles/index';
@import './styles/normalize';

#root {
  width: 100%;
  height: 100%;
  color: var(--el-color-primary);
  font-size: 14px;
}

.el-popup-parent--hidden {
  overflow: hidden;
}
</style>
