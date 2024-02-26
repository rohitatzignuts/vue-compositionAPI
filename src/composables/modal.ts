import { ref, shallowRef } from "vue";
import SignInFormVue from "../components/SigninForm.vue";
import SignUpFormVue from "../components/SignupForm.vue";


const show = ref(false);
const component = shallowRef();

export function useModal() {
    return {
        show,
        component,
        showModal: (type: 'signUp' | 'signIn') => {
        show.value = true
        switch (type) {
            case 'signIn': return component.value = SignInFormVue
            case 'signUp': return component.value = SignUpFormVue
        }
        },
        hideModal: () => (show.value = false),
    };
}