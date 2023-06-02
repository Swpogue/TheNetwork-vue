<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="col-10" v-for="p in posts" :key="p.id">
      <PostCard :post="p" />
    </div>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postsService } from '../services/PostsService.js'
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    async function getPosts(){
    try {
      logger.log('Home Page Gets')
      await postsService.getPosts();
    } 
    catch (error) {
      Pop.error(error)
    }
  }
  onMounted(()=> {
    getPosts();
  });
    return {posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
