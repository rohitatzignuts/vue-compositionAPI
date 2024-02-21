<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router';
import { usePosts } from '../stores/posts';

const postStore = usePosts()
const router = useRoute()

const id =  router.params.id as string
let post = postStore.all.get(id)
if(!post){
    throw Error('post with id' + id + 'was not found!')
} else {
    post = post || {} // Add this line to ensure post is initialized
}
</script>

<template>  
    <div class="columns">
        <div class="column"></div>
        <div class="column is-two-thirds">
            <RouterLink 
            :to="`/posts/${id}/edit`"
            class="is-link button is-rounded"
            >
                Edit Post
            </RouterLink>
            <h1>{{ post.title }}</h1>
            <div v-html="post.htmlValue"></div>
        </div>
        <div class="column"></div>
    </div>
</template>
