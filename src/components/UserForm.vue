<script lang="ts" setup>
import { computed, ref } from 'vue';
import FormInput from './FormInput.vue';
import { NewUser } from '../users'
import { validate, length, required } from '../validation'

defineProps<{
    error?: string;
    head :string
}>();

const emit = defineEmits<{
    (event: 'submit', payload: NewUser): void
}>()

const username = ref('')
const usernameStatus = computed(() => {
    return validate(username.value, [required, length({ min: 5, max: 10 })])
})

const password = ref('')
const passwordStatus = computed(() => {
    return validate(password.value, [required, length({ min: 6, max: 20 })])
})

const isInvalid = computed(() => {
    return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})


async function handleSubmit () {
    if (isInvalid.value) {
        return
    }

    const newUser: NewUser = {
        username: username.value,
        password: password.value,
    }

    try {
        emit('submit', newUser)
    } catch (e) {}
}
</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
        <h1>{{ head }}</h1>
        <FormInput name="Username" v-model="username" :status="usernameStatus" type="text" />
        <FormInput name="Password" v-model="password" :status="passwordStatus" type="password" />
        <div v-if="error" class="is-danger help">
        {{ error }}
        </div>
        <button class="button" :disabled="isInvalid">Submit</button>
    </form>
</template>

<style scoped>
.form {
    background: white;
    padding: 30px;
    margin-top: 50px;
}
h1{
    color: black;
}
</style>