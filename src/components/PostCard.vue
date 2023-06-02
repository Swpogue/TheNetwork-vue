<template>
 <div class="card">
        <div class="card-body">
            <div class="row ">
                <div class="col-12 d-flex justify-content-between">

                
                    <router-link :to="{name: 'Profile', params: { id: post?.creatorId }}">
                    <img class="rounded-circle post-imgUrl" :src="post?.profilePic" alt="">
                </router-link>
                
                    <img class="rounded-circle post-imgUrl" :src="post?.imgUrl" alt="">
                </div>
            </div>
            <p class="fw-bold">{{blog?.creatorName}}</p>
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
  setup(props){
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