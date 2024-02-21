// useModal.ts
import { ref } from "vue";
import SignUpForm from "../components/SignUpForm.vue";
import SignInForm from "../components/SignInForm.vue";

const show = ref(false);
const component = ref<any>(null); // Initialize with null to prevent initial rendering

export function useModal() {
    return {
        show,
        component,
        showModal: (type: 'signIn' | 'signUp') => {
            show.value = true;
            switch (type) {
                case 'signIn': component.value = { component: SignInForm, key: 'signIn' }; break;
                case 'signUp': component.value = { component: SignUpForm, key: 'signUp' }; break;
            }
        },
        hideModal: () => show.value = false
    };
}
