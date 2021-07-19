<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { registerMicro } from './plugins';
export default defineComponent({
  setup() {
    /**
     * @description: 注册微服务
     */
     registerMicro();
  },
});

</script>