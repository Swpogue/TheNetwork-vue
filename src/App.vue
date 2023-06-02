<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="row" id="banner">
      <BannerCard />
    </div>
    <router-view />
  </main>
   
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      ads: computed(()=> AppState.ads)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}
#banner{
  justify-content: end;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
