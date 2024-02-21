<script setup lang="ts">
import { NewUser } from '../user';
import UserForm from './UserForm.vue';
import { useUsers } from '../stores/users';
import { useModal } from '../composables/modal';
import { ref } from 'vue';

const modal = useModal()
const userStore = useUsers()
const error = ref('')
async function handleSignin (newUser : NewUser){    
    const body = JSON.stringify(newUser)
    const res = await window.fetch('api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body,
    });
    if([404,401].includes(res.status)){
        error.value = 'Username or Password is incorrect'
    }else{
        userStore.authenticate()
        modal.hideModal()
    }
}
</script>

<template>
    <UserForm @submit="handleSignin" :error="error" head="Sign In"/>
</template>