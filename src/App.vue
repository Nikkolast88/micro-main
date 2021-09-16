<template>
  <el-config-provider :locale="locale">
  <template v-if="routeName">
    <router-view ></router-view>
  </template>
  <template v-else>
    <layout>
      <div id="app"></div>
    </layout>
  </template>
  </el-config-provider>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import Layout from '@/layout/index.vue';
import { useRoute } from 'vue-router';
// import enUS from 'element-plus/lib/locale/lang/en';
const locale = zhCn;
const $route = useRoute();
const routeName = computed(() => $route.name);
</script>
<style lang="scss">
@import './styles/__variables.scss';
@import '~element-plus/dist/index.css';
@import './styles/index.scss';
@import './styles/normalize.scss';
#root {
  width: 100%;
  height: 100%;
  color: var(--color-default);
}
</style>
