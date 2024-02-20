<script setup lang="ts">
import { ITimeLineItem } from '../posts';
defineProps<{
    post : ITimeLineItem
}>()
</script>

<template>
    <a class="panel-block is-flex is-flex-direction-coloumn is-align-items-start">
        <a>{{ post.title }}&nbsp;</a>
        <div>{{ post.createdAt.toFormat('d MMM ') }}</div>
    </a>
</template>