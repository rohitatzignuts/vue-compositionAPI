<script setup lang="ts">
import TimeLine from '../components/TimeLine.vue'

</script>

<template>
    <Suspense>
        <template #default>
            <TimeLine />
        </template>
        <template #fallback>
            <progress class="progress is-primary is-small"></progress>
        </template>
    </Suspense>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>