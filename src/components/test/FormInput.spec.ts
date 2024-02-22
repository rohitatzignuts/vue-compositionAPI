import { mount } from "@vue/test-utils";
import { describe,expect,it } from "vitest";
import FormInput from "./FormInput.vue";
import { ref,computed, defineComponent } from "vue";
import { Status } from "../../validation"

describe('FormInput',() => {
    it.only("responds to input", () => {
        const Parent = defineComponent({
            setup() {
                const username = ref('lachlan')
                const status = computed<Status>(() => {
                const valid = username.value.length > 5
                return {
                    valid,
                    message: valid ? undefined : 'It is too short'
                }
                })
                return {
                username,
                status
                }
            },
            components: {
                FormInput
            },
            template: `
                <FormInput
                name="username"
                v-model="username"
                :status="status"
                type="text"
                />
            `
        })
        const wrapper = mount(parent)
        console.log(wrapper);
        
    })
})