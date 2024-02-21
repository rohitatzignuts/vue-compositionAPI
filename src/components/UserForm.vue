<script setup lang="ts">
import { ref, computed } from 'vue';
import FormInput from './FormInput.vue';
import { validate, length, required } from '../validate';
import { NewUser } from '../user';

defineProps<{
    error ?: string,
    head : string
}>()
const username = ref('');
const usernameStatus = computed(() => validate(username.value, [required, length({ min: 5, max: 10 })]));

const password = ref('');
const passwordStatus = computed(() => validate(password.value, [required, length({ min: 5, max: 10 })]));
const emit = defineEmits<{
    (event : 'submit', payload:NewUser): void
}>()
const isValid = computed( () => {
        return (!passwordStatus.value.valid || !passwordStatus.value.valid)
})

async function handleSubmit() {
    if(!isValid){
        return
    }
    const newUser: NewUser = {
        username: username.value,
        password: password.value
    };
    emit('submit',newUser)
}
</script>

<template>
    <section class="section">
        <form class="container" @submit.prevent="handleSubmit">
            <h1>{{ head }}:</h1>
            <FormInput type="text" name="Username" v-model="username" :status="usernameStatus" />
            <FormInput type="password" name="Password" v-model="password" :status="passwordStatus" />
            <div v-if="error" class="is-danger help">{{ error }}</div>
            <button class="button" :disabled="isValid">Submit</button>
        </form>
    </section>
</template>

<style scoped>
form {
    padding: 25px;
    background-color: #fff;
    border-radius: 5px;
}
h1{
    color: black;
    font-weight: bold;
}
</style>
