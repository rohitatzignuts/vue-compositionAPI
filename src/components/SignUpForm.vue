<script setup lang="ts">
import { NewUser } from '../user';
import UserForm from './UserForm.vue';
import { useUsers } from '../stores/users';
import { useModal } from '../composables/modal';

const modal = useModal()
const userStore = useUsers()

async function handleSignUp(newUser : NewUser){
    await userStore.createUser(newUser)
    modal.hideModal()
}
</script>

<template>
    <UserForm @submit="handleSignUp" head="Sign Up"/>
</template>