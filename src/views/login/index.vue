<template>
  <div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { UserLogin } from '@/api/user';
interface IUser {
  id: string | number;
}
export default defineComponent({
  setup() {
    UserLogin<IUser[]>({ id: 1 }).then((resp) => {
      console.log(resp);
    });
  },
});
</script>
<style lang="scss"></style>