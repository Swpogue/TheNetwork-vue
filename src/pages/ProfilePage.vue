
<template>
    <div class="p-4">
    <button :disabled="!newer" @click="changePage(newer)" class="btn btn-light">Previous</button>
    <button :disabled="!older" @click="changePage(older)" class="btn btn-light">Next</button>
  </div>
  <div class="profile-page">

      <div class="container">
          <div class="row mt-2" v-if="profile">
              <div class="col-md-8 m-auto">
                  <div>
                      <ProfileCard :profile="profile" />
                  </div>
              </div>
          </div>

          <div class="row my-3">
              <div class="col-md-8 m-auto" v-for="p in posts" :key="p.id">
                  <PostCard :post="p" />
              </div>
          </div>

      </div>




  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { profileService } from '../services/ProfileService.js'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'
// import { logger } from "../utils/Logger.js"

export default {
  setup() {
      const route = useRoute()

      async function getProfile() {
          try { 
              
              await profileService.getProfileById(route.params.id)
          } catch (error) {
              Pop.error(error, '[Getting Profile]')
          }
      }

      async function getPostsByProfile() {
          try {
              await postsService.getPostsByProfile(route.params.id)
          } catch (error) {
              Pop.error(error, '[Getting Posts]')
          }
      }


      onMounted(() => {
          getProfile()
          getPostsByProfile()
      })


      return {
          profile: computed(() => AppState.activeProfile),
          posts: computed(() => AppState.posts),
          older: computed(()=> AppState.older),
          newer: computed(()=> AppState.newer),
      async changePage(url){
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }
      }
  }
}
</script>


<style lang="scss" scoped></style>