<template>
 <div class="card my-2">
        <div class="card-body">
            <div class="row ">
                <div class="col-12 d-flex justify-content-between">

                
                    <router-link :to="{name: 'Profile', params: { id: post?.creatorId }}">
                    <img class="rounded-circle post-imgUrl" :src="post?.profilePic" :alt="post?.creator.name">
                </router-link>
                
                    <img class="rounded post-img" :src="post?.imgUrl" :alt="post?.creator.name">
                </div>
            </div>
            <p class="fw-bold">{{post?.creator.name}}</p>
            <p>
               {{ post?.body }} 
            </p> 
        </div>
        <div>
          <i @click="likePost(post.id)" class="selectable p-1 mdi mdi-heart"></i>
          <p>{{ post.likes.length }}</p>
        </div>
    </div>

</template>


<script>
import { computed } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";

export default {
  props:{
    post: {type: Post, required: true}
  },
  setup(){
    return {
      account: computed(()=> AppState.account),
      
      async likePost(id){
        try {
          logger.log('[POST LIKED]', id)
          await postsService.likePost(id)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.post-imgUrl{
    height: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
}
.post-img{
  height: 300px;
  object-fit: cover;
}

</style>