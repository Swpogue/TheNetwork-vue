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
</section></template>


<script>
import { computed, ref } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
export default {
  setup(){
    const editable = ref({});
    return {
      editable,
      account: computed(() => AppState.account),

      async createPost() {
                try {
                    // logger.log("POSTING!!");
                    const post = editable.value;
                    await postsService.createPost(post);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
    }
  }
}
</script>


<style lang="scss" scoped>
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