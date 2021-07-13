<template>
  <div class="page-header">
    <div class="page-header-container">
      <div class="page-header-wrapper">
        <div class="header-left">
          <div class="header-back pointer" @click="onBack">
            <back-svg></back-svg>
          </div>
          <div class="header-route">{{ projectName }}-<a class="pointers">{{ routeName }}</a></div>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="onNext">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'PageHeader',
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const routeName = ref($route.meta.title);
    const projectName = ref($route.query.name);

    const onBack = () => {
      $router.push('/project');
    };
    const onNext = () => {
      $router.push({ path: '/static/plan', query: { id: $route.query.id, name: projectName.value } });
    };
    return {
      routeName,
      projectName,
      onBack,
      onNext,
    };
  },
});
</script>

<style lang="scss">
.page-header-container{
  height: 100%;
  .page-header-wrapper{
    display: flex;
    align-items: center;
    line-height: 60px;
    z-index: 2004;
  }
  .header-left{
    display: flex;
    .header-back{
      font-size: 22px;
      color: #1989FA;
      padding-right: 16px;
    }
    .header-route{
      font-size: 22px;
      color: #303133;
      a{
        color: #1989FA;
      }
    }
  }
  .header-right{
    flex: 1;
    text-align: right;
  }
}
</style>