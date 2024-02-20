<script setup lang="ts">
import { ref, computed } from 'vue';
import FormInput from './FormInput.vue';
import { validate, length, required } from '../validate';
import { NewUser } from '../user';
import { useUsers } from '../stores/users'
import { useModal } from '../composables/modal';

const modal = useModal()
const users = useUsers()
const username = ref('');
const usernameStatus = computed(() => validate(username.value, [required, length({ min: 5, max: 10 })]));

const password = ref('');
const passwordStatus = computed(() => validate(password.value, [required, length({ min: 5, max: 10 })]));

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
    await users.createUser(newUser)
    modal.hideModal()
}
</script>

<template>
    <section class="section">
        <form class="container" @submit.prevent="handleSubmit">
            <FormInput name="Username" v-model="username" :status="usernameStatus" />
            <FormInput name="Password" v-model="password" :status="passwordStatus" />
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
</style>
