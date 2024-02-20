<script setup lang="ts">
import { useModal } from '../composables/modal';
const modal = useModal()

</script>
<template>
    <div class="navbar">
        <div class="navbar-end">
            <div class="buttons">
                <RouterLink to="/" class="button">Home</RouterLink>
                <button to="/" class="button" @click="modal.showModal">Sign In</button>
                <RouterLink to="/posts/new" class="button">New Post</RouterLink>
            </div>
        </div>
    </div>  
    <Teleport to="#modal"></Teleport>
</template>