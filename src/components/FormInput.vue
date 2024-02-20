<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Status } from '../validate';

defineProps<{
    name: string,
    modelValue: string,
    status: Status
}>();
const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>();

function handleInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
    <div class="field">
        <label :for="name" class="label">{{ name }}</label>
        <div class="control">
            <input type="text" class="input" :id="name" :value="modelValue" @input="handleInput">
        </div>
        <p class="is-danger help" v-if="!status.valid">{{ status.message }}</p>
    </div>
</template>

