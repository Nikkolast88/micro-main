<template>
  <div v-if="!route.meta.hidden" class="page-title">{{ route.meta.title }}</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PageTitle',
  setup() {
    const $route = useRoute();
    const route = computed(() => $route);
    return {
      route,
    };
  },
});
</script>

<style lang="scss">
.page-title{
  font-size: 24px;
  color: #1989FA;
  padding-bottom: 16px;
}
</style>