<script setup lang="ts">
import { useModal } from '../composables/modal';
import { useUsers } from '../stores/users';

const userStore = useUsers()
const modal = useModal()

</script>
<template>
    <div class="navbar">
        <div class="navbar-end">
            <div class="buttons" v-if="userStore.currentId">
                <RouterLink to="/" class="button">Home</RouterLink>
                <RouterLink to="/posts/new" class="button">New Post</RouterLink>
                <button  class="button" @click="userStore.logoutUser()">Log Out</button>
            </div>              
            <div class="buttons" v-else>
                <button class="button" @click="modal.showModal('signIn')" :key="'signIn'">Sign In</button>
                <button class="button" @click="modal.showModal('signUp')" :key="'signUp'">Sign Up</button>
            </div>
        </div>
    </div>  
    <Teleport to="#modal">
        <component :is="modal.component" :key="modal.component  " />
    </Teleport>
</template>
