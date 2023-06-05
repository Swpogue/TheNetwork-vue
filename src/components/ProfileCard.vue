<template>
  <div class="card mb-2">
    <div class="card-body">
      <div class="profile-card mb-2 text-center">
        <p class="text-center mb-0">
          <img class="rounded-circle profile-picture" :src="profile.picture" :alt="profile.name">
        </p>
      </div>
      <p> <i class="mdi mdi-account"></i> <b>{{ profile.name }}</b><i v-if="profile.graduated" class="mdi mdi-school-outline"></i></p>
      <p>{{ profile.bio }}</p>
      <div class="d-flex">
        <span v-if="profile.class">Class-{{ profile.class }}</span>
        <p v-if="profile.github" class="ps-4">
          <a :href="profile.github" target="_blank" rel="noopener">
            <i class="mdi mdi-github"></i>
          </a>
        </p>
        <p v-if="profile.linkedin" class="px-2">
          <a :href="profile.linkedin" target="_blank" rel="noopener">
            <i class="mdi mdi-linkedin"></i>
          </a>
        </p>
        <p v-if="profile.resume" class="px-2">Resume:
          <a :href="profile.resume" target="_blank" rel="noopener">
            <i class="mdi mdi-file-account"></i>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { Account } from '../models/Account.js';
import { Profile } from '../models/Profile.js';

export default {
  props: {
    // profile: { type: Object, required: true }
    profile: { type: [Profile, Account], required: true }
  },
  setup(props) {
    return {
      coverImg: computed(() => `url(${props.profile?.coverImg})`)
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-card {
  background-image: v-bind(coverImg);
  aspect-ratio: 1/1;
  height: 150px;
  min-width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  display: grid;
  place-content: center;
}

.profile-picture {
  height: 100px;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>