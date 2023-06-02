<template>
 <div class="card my-2">
        <div class="card-body">
            <div class="row ">
                <div class="col-12 d-flex justify-content-between">

                
                    <router-link :to="{name: 'Profile', params: { id: post?.creatorId }}">
                    <img class="rounded-circle post-imgUrl" :src="post?.profilePic" :alt="post?.creator.name">
                </router-link>
                
                    <img class="rounded-circle post-imgUrl" :src="post?.imgUrl" :alt="post?.creator.name">
                </div>
            </div>
            <p class="fw-bold">{{post?.creator.name}}</p>
            <p>
               {{ post?.body }}
            </p>

        </div>
    </div>

</template>


<script>
import { Post } from "../models/Post.js";

export default {
  props:{
    post: {type: Post, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.post-imgUrl{
    height: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
}
</style>