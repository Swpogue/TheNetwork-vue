<template>
  <section>

  </section>
  <section class="d-flex justify-content-center container-fluid">
    <div class="col-3 p-2">
        <form @submit.prevent="searchPosts()">
          <div class="input-group mb-3">
            <input class="query-form" type="text" v-model="search.query" placeholder="Search" aria-label="Search"
              aria-describedby="Search">
            <button class="btn btn-outline-dark" id="search" type="submit" ><i class="mdi mdi-magnify"></i></button>
          </div>
        </form>
    </div>
  </section>
  <div>
    <CommentCard />
  </div>
  <div class="p-4" style="text-align: center;">
    <span class="pe-1">
      <button :disabled="!newer" @click="changePage(newer)" class="btn btn-light">Previous</button>
    </span>
    <button :disabled="!older" @click="changePage(older)" class="btn btn-light">Next</button>
  </div>
  <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="col-8" v-for="p in posts" :key="p.id">
      <PostCard :post="p" />
    </div>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postsService } from '../services/PostsService.js'
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import CommentCard from "../components/CommentCard.vue";

export default {
    setup() {
        
        const search = ref({});
        onMounted(() => {
            getPosts();
            async function getPosts() {
                try {
                    // logger.log("Home Page Gets");
                    await postsService.getPosts();
                }
                catch (error) {
                    Pop.error(error);
                }
            }
        });
        return {
            search,
            posts: computed(() => AppState.posts),
            older: computed(() => AppState.older),
            newer: computed(() => AppState.newer),
            account: computed(() => AppState.account),
            async changePage(url) {
                try {
                    await postsService.changePage(url);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            
            async searchPosts() {
                try {
                    const query = search.value;
                    logger.log('SEARCHING!')
                    await postsService.searchPosts(query);
                }
                catch (error) {
                    Pop.error(error);
                }
            }
        };
    },
    components: { CommentCard }
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
button{
  width: 100px;
}

#search{
  background-color: rgb(84, 59, 128);
}
.comment-form{
  width: 50em;
  height: 7em;
}
.url-form{
  width: 53em;
}
#profile-img {
height: 100px;
width: 100px;
}
</style>
