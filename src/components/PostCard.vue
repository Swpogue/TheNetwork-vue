<template>
  <div class="card my-2 elevation-4">
    <div class="card-body">
      <div class="row">
        <div class="col-12 d-flex justify-content-between">
          <router-link :to="{ name: 'Profile', params: { id: post?.creatorId } }">
            <img class="img-fluid rounded-circle post-imgUrl" :src="post?.profilePic" :alt="post?.creator.name">
            <p class="fw-bold pt-2">{{ post?.creator.name }}</p>
          </router-link>
          <img class="img-fluid rounded post-img" :src="post?.imgUrl" :alt="post?.creator.name">
        </div>
      </div>

      <p>
        {{ post?.body }}
      </p>
    </div>
    <div class="ps-2">
      <span>Created: {{ post?.createdAt }}</span>
    </div>
    <div class="text-end p-2 d-flex" id="I-tag">
      <i @click="likePost(post.id)" class="selectable p-1 mdi mdi-heart"> <span>{{ post.likes.length }}</span></i>
      <i v-if="post.creatorId == account.id" @click="deletePost(post.id)" class="selectable p-1 mdi mdi-delete"></i>
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
  props: {
    post: { type: Post, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),

      async likePost(id) {
        try {
          logger.log('[POST LIKED]', id)
          await postsService.likePost(id)
        } catch (error) {
          Pop.error(error)
        }
      },

      async deletePost() {
        try {
          const postId = props.post.id
          logger.log('DELETING?')
          if (await Pop.confirm('Delete Post?'))
            await postsService.deletePost(postId)
        } catch (error) {
          Pop.error(error)
        }
      },

      async editPost() {
        try {
          const postId = props.post.id
          await postsService.editPost(postId)
        } catch (error) {
          Pop.error(error)
        }
      }


    }
  }
}
</script>


<style lang="scss" scoped>
.post-imgUrl {
  height: 100px;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.post-img {
  height: 300px;
  object-fit: cover;
}

.card {
  background-color: rgb(60, 176, 193);
}

#I-tag {
  justify-content: space-between;
}
</style>