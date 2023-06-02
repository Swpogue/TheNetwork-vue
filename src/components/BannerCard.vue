<template>
  
<div class="col-2 m-2" v-for="a in ads" :key="a.id">
  <img :src="a?.square" alt="">
</div>

</template>


<script>
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { bannersService } from "../services/BannersService.js"
import { computed, onMounted } from "vue"
import { AppState } from "../AppState.js"

export default {

  setup(){
    onMounted(()=> {getAds();
      async function getAds(){
        try {
          logger.log('ADS SUCK!')
          await bannersService.getAds();
        } catch (error) {
          Pop.error(error)
        }
      }
    })
    return {
      ads: computed(()=> AppState.ads)
    }
  }
}
</script>


<style lang="scss" scoped>
img{
    height: 100px;
    aspect-ratio: 2/1;
    object-fit: cover;
}
</style>