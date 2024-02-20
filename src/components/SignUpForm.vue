<script setup lang="ts">
import { computed,ref } from 'vue';
import FormInput from './FormInput.vue';
import {validate,length,required} from '../validate'
import {NewUser} from '../user'

const username = ref('')
const usernameStatus = computed(()=>{
    return validate(username.value,[required,length({min:5,max:10})])
})  
const password = ref('')
const passwordStatus = computed(()=>{
    return validate(password.value,[required,length({min:5,max:10})])
})  
function handleSubmit(){
    const newUser : NewUser = {
        username : username.value,
        password : password.value
    }
    console.log(newUser);
    
}
</script>

<template>
    <section class="section">
        <form class="container" @submit.prevent="handleSubmit">
            <FormInput name="Username" v-model="username" :status="usernameStatus" />
            <FormInput name="Password" v-model="password" :status="passwordStatus" />
            <button class="button">Submit</button>
        </form>
    </section>
</template>

<style scoped>
form{
    padding: 25px;
    background-color: #fff;
    border-radius: 5px;
}
</style>