<script setup lang="ts">
import { computed } from 'vue';
import Navbar from './components/Navbar.vue';
import { useModal } from './composables/modal';
import { useUsers } from './stores/users'
import SignUpForm from './components/SignUpForm.vue';
// import SignInForm from './components/SignInForm.vue';
const userStore = useUsers()
const modal = useModal()
const modalStyle = computed(() => {
  return {
    display : modal.show.value ? 'block' : 'none'
  }
}) 
userStore.authenticate()
</script>

<template>
  <section class="section">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </section>
  <div class="modal" id="modal" style="color: #ffffff ;" :style="modalStyle">
    <div class="modal-background"></div>
    <div class="modal-content">
      <SignUpForm />
    </div>
    <button class="modal-close is-large" aria-label="close" @click="modal.hideModal"></button>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import 'highlight.js/styles/atom-one-dark.css';
ul {
  list-style: revert !important;
  list-style-position: revert !important  ;
}
h1,h2,h3,h4,h5,h6{
  font-size: revert !important;
  margin: 10px 0 !important  ;
}
pre{
  margin: 10px 0 !important;
}
p{
  margin: 10px 0 !important;
}
</style>