<template>
  <section class="row justify-content-center" v-if="account.id">
      <div class="col-8 card p-2">
        <form @submit.prevent="createPost()" class="card elevation-3">
          <div class="m-2 d-flex">
            <img  id="profile-img" class="p-2" :src="account.picture" :alt="account.name">
            <textarea v-model="editable.body" class="comment-form" placeholder="Comment here"
            id="textarea"></textarea>
            <label for="textarea"></label>
          </div>
          <div class="input-group mb-3 p-2">
            <span class="input-group-text" id="inputGroup-sizing-default">URL</span>
            <input v-model="editable.imgUrl" type="url" class="url-form" aria-label="Url for picture"
              aria-describedby="inputGroup-sizing-default">
          </div>
          <button class="btn btn-primary m-2">Post IT!</button>
        </form>
      </div>
    </section>

  <div class="p-4" style="text-align: center;">
    <button :disabled="!newer" @click="changePage(newer)" class="btn btn-light">Previous</button>
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

export default {
  setup() {
    const editable = ref({})
    onMounted(()=> {getPosts();
    async function getPosts(){
    try {
      logger.log('Home Page Gets')
      await postsService.getPosts();
    } 
    catch (error) {
      Pop.error(error)
    }
  }
  });
    return {
      editable,
      posts: computed(() => AppState.posts),
      older: computed(()=> AppState.older),
      newer: computed(()=> AppState.newer),
      account: computed(() => AppState.account),

      async changePage(url){
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      },
      async createPost(){
        try {
          logger.log('POSTING!!')
          const post = editable.value
          await postsService.createPost(post)
          
        } catch (error) {
          Pop.error(error)
        }
      }

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

button{
  width: 100px;
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
