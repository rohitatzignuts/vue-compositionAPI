<script setup lang="ts">
import { Status } from '../validate';

defineProps<{
    name :string,
    modalValue : string,    
    status:Status
}>()    
const emit = defineEmits<{
    (event : 'update:modalValue',value : string):void
}>()
function handleInput(e:Event){      
    const value = (e.target as HTMLInputElement).value
    emit('update:modalValue',value)
}
</script>

<template>
    <div class="field">
        <label :for="name" class="label">{{ name }}</label>
        <div class="control">
            <input type="text" class="input" :id="name" :value="modalValue" @input="handleInput">
        </div>
        <p class="is-danger help" v-if="!status.valid">
            {{ status.message }}
        </p>
    </div>
</template>