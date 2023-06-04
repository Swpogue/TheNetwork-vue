<template>
  <div class="text-center">
    
  </div>
  <div class="row d-flex justify-content-center m-5">
    <ProfileForm />
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
