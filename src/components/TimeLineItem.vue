<script setup lang="ts">
import { ITimeLineItem } from '../posts';
import { RouterLink } from 'vue-router';

defineProps<{
    post : ITimeLineItem
}>()
</script>

<template>
    <RouterLink :to="`/posts/${post.id}`" class="panel-block is-flex is-flex-direction-coloumn is-align-items-start">
        <a>{{ post.title }}&nbsp;</a>
        <div>{{ post.createdAt.toFormat('d MMM ') }}</div>
    </RouterLink>
</template>