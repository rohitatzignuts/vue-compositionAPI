<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { usePosts } from '../stores/posts';
import PostWriter from '../components/PostWriter.vue';

const postStore = usePosts()
const router = useRoute()

const id =  router.params.id as string
let post = postStore.all.get(id)
if(!post){
    throw Error('post with id' + id + 'was not found!')
} 
</script>

<template>  
    <PostWriter :post="post"/>
</template>
