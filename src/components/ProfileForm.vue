<template>
  <form class="card elevation-1 col-6" @submit.prevent="submitEdit">

<div class="card-body">
  <div class="form-floating mb-3">
    <input name="name" class="form-control" placeholder="Name" type="text" required v-model="editable.name">
    <label for="name">Name:</label>
  </div>
  <div class="form-floating mb-3">
    <input name="picture" class="form-control" placeholder="Profile Picture" type="url" required
      v-model="editable.picture">
    <label for="picture">Picture:</label>
  </div>
  <div class="form-floating mb-3">
    <input name="cover-img" class="form-control" placeholder="cover Image" type="url" 
      v-model="editable.coverImg">
    <label for="cover-img">Cover Image:</label>
  </div>
  <div class="form-floating mb-3">
    <textarea v-model="editable.bio" class="form-control" placeholder="Bio" id="floatingTextarea"></textarea>
          <label for="floatingTextarea">Bio:</label>
  </div>
  <div class="form-floating mb-3">
    <input name="email" class="form-control" placeholder="email" type="text" v-model="editable.email">
    <label for="email">Email:</label>
  </div>
  <div class="form-floating mb-3">
    <input name="github" class="form-control" placeholder="github" type="url" v-model="editable.github">
    <label for="github">Github:</label>
  </div>
  <div class="form-floating mb-3">
    <input name="linkedin" class="form-control" placeholder="linkedin" type="url" v-model="editable.linkedin">
    <label for="linkedin">Linkedin:</label>
  </div>
  <div class="form-floating mb-3">
    <input name="resume" class="form-control" placeholder="resume" type="url" v-model="editable.resume">
    <label for="resume">Resume:</label>
  </div>
  <div class="input-text">
    <input v-model="editable.graduated" type="checkbox">
      <label class="px-3" for="graduated">Graduated?</label>
  </div>
</div>
<div class="card-footer text-end">
  <button class="btn btn-outline-primary" type="submit">Save Profile</button>
</div>


</form>
</template>


<script>
import { ref, watchEffect } from "vue"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"
import { accountService } from "../services/AccountService.js"


export default {
  setup(){
    const editable = ref({})
    
    watchEffect(()=> {
      editable.value = { ...AppState.account}
    })

    return {
     editable,
     async submitEdit(){
      try {
        await accountService.submitEdit(editable.value)
      } catch (error) {
        Pop.error(error, 'Editing Profile')
      }
     }

    }
  }
}
</script>


<style lang="scss" scoped>
.card{
  width: 30em;
}
</style>